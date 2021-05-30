import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Footer, Picker } from 'native-base';
import css from '../style/css';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import DataPicker from 'react-native-datepicker';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AgendaConsultaScreen ({ navigation }){


  // changeData = (valor) =>{
  //   this.setState({
  //     data: valor
  //   })
  // }

  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);  
      formattedDate = (currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear() + " " + currentDate.getHours() + "h:" + currentDate.getMinutes()+ "m")
      console.log(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const HideMode = (currentMode) => {
      setShow (true);
      chosenDate: date.format('DD/MM/YYYY');
    }


  state ={
    date: ''
  }

  return (
    <View style={styles.container}>         
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={styles.IconPosicao}>
            <Feather name="arrow-left" size={25} onPress={()=>navigation.navigate('Home')}/>
          </View>
        </View>  
        <View style={{flex:1,}}>
          <View style={{paddingLeft:10, alignItems:'center', margin:10}}>
            <Text style={{fontSize:23, color: '#05375a',fontWeight:'bold',}}>Agendar Consulta</Text>
          </View>
            <View>
            <Text style={[styles.text_footer,{marginTop:40, marginLeft:10}]}>Especialidade</Text>
              <Picker style={{ height: 50, width: '100%', marginBottom: 10, marginLeft:5, color:'black'}}> 
                <Picker.Item label="Dermatologia" value="Dermatologia" />
                <Picker.Item label="Ortopedia" value="Ortopedia" />
                <Picker.Item label="Cardiologia" value="Cardiologia" />
                <Picker.Item label="Ginecologia e Obstetrícia" value="Ginecologia e Obstetrícia" />
                <Picker.Item label="Neurologia" value="Neurologia" />
                <Picker.Item label="Endocrinologia" value="Endocrinologia" />
                <Picker.Item label="Urologia" value="Urologia" />
              </Picker>
            <Text style={[styles.text_footer,{marginTop:15, marginLeft:10}]}>Hospital</Text>
              <Picker style={{ height: 50, width: '100%', marginBottom: 10, marginLeft:5, color:'black'}}
              > 
                
              </Picker>
              <Text style={[styles.text_footer,{marginTop:15, marginLeft:10}]}>Data</Text>
              <View style={{alignItems:'center',}}>
              <View style={{backgroundColor:'#01ab9d', width: '60%', height:30, alignItems:'center', marginTop:30}}>
                <TouchableOpacity onPress={showDatepicker}>
                  <Text style={{fontSize: 18}}>SELECIONAR DATA</Text>
                </TouchableOpacity>
              </View>
            
                  {show && (
                    <DateTimePicker
                      minuteInterval = { 30 }
                      themeVariant = "dark"
                      format="DD-MM-YYYY"
                      testID="dateTimePicker"
                      color= 'white'
                      value={date}
                      locale = "pt-BR"
                      is24Hour = { true }
                      mode={mode}
                      display="spinner"onChange={onChange}
                      minimumDate = { new  Date ( ) } 
                      maximumDate = { new  Date ( 2021 ,  10 ,  30 ) }
                      style={{backgroundColor: "green"}}
                    />
                  )}
                </View>
                <Text style={{fontSize: 18}}>{date}</Text>
              <Text style={[styles.text_footer,{marginTop:15, marginLeft:10}]}>Horário</Text>
              <View style={{alignItems:'center',}}>
                <View style={{backgroundColor:'#01ab9d', width: '60%', height:30, alignItems:'center', marginTop:30}}>
                  <TouchableOpacity onPress={showTimepicker}>
                    <Text style={{fontSize: 18}}>SELECIONAR HORÁRIO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity   style={[styles.signIn, {borderColor: '#009387', borderWidth: 1,width:200 , height:50  }]} >
                <Text style={[styles.textSign, { color: '#009387'}]}>Agendar</Text>
              </TouchableOpacity>
              </View>
        </View>
      <Footer style={{backgroundColor:"#008B8B"}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnTipo: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin:22
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    
  },
  IconPosicao:{
    marginLeft: 10,
    marginTop: 6
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    fontWeight: 'bold'
  },
  botao:{
    alignItems:'center',
    justifyContent:'center',
    padding:15,
  },
  signIn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
