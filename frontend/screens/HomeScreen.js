import React, {Component} from 'react';
import { StyleSheet, View, StatusBar, Text, ActivityIndicator, Alert } from 'react-native';
import { Icon, Footer, List, Title, Content } from 'native-base';
import css from '../style/css';
import getArticles from '../services/NewsApi';
import DataItem from '../components/DataItem';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Modal from '../components/modalNews';

export default class HomeScreen extends Component {

  constructor(props)  {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData:{}
    }
  }

  handleItemDataOnPress = (articleData) =>{
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData
    });
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    })
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
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
    );
  }

}



  
 const styles = StyleSheet.create({
  container: {

    flex: 1
  },
});

