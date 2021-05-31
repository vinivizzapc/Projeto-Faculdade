import React, {Component} from 'react';
import { ListItem, Left, Right, Thumbnail, Body, Button } from 'native-base';
import {Text, Dimensions} from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import TimeAgo from './time'
class DataItem extends Component {

    constructor(props) {
        super(props);
        this.data = props.data;
    }

    handlePress = () => {
      const {url, title} = this.data;
      this.props.onPress({url, title});
    }

    state = {
      loading: true
    }

    async componentDidMount() {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      this.setState({ loading: false })
    }

    render() {
        return(
            <ListItem style={{width:Dimensions.get("window").width}} thumbnail >
              <Left>
                <Thumbnail square source={{ uri: this.data.urlToImage != null ? this.data.urlToImage : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>{this.data.title}</Text>
                <Text  note numberOfLines={2}>{this.data.description}</Text>
                <TimeAgo time={this.data.publisedAt}/>
              </Body>
              <Right>
                <Button transparent onPress={this.handlePress}>
                  <Text style={{marginLeft:30, marginRight:20}}>View</Text>
                </Button>
              </Right>
            </ListItem>
        );
    }
}

export default DataItem;