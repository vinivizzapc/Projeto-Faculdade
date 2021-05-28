import React, {Component} from 'react';
import { StyleSheet, View, StatusBar, Text, ActivityIndicator, Alert } from 'react-native';
import { Icon, Footer, List, Title, Content, Left } from 'native-base';
import css from '../style/css';
import getArticles from '../services/NewsApi';
import DataItem from '../components/dataItem';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


export default class HomeScreen extends Component {

  constructor(props)  {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
    }
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
    getArticles().then(data => {
      this.setState({
        isLoading: false,
        data: data
      });
    }, error => {
      Alert.alert('Error', 'Something went wrong!');
    }
    )
  }
   render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }

     let view = this.state.isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
      <Text style={{marginTop: 10}} children="Please Wait.." />
    </View>
  ) : (
    <List
      dataArray={this.state.data}
      renderRow={(item) => {
          return (
            <DataItem onPress={this.handleItemDataOnPress} data={item} />
          )
      }} />
      
     )

    return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#008B8B"/>
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Title style={{color:'black', margin: 10}}>Noticias</Title>
        <Content > 
          <Text style={{color:'black', margin: 0, fontSize:10}}> 
            {view}
          </Text>
        </Content>
      </View>
      <Footer style={css.containerFooter}/>
    </View>
    );
  }

}



  
 const styles = StyleSheet.create({
  container: {

    flex: 1
  },
});

