 
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity } from 'react-native';
import { Icon, Footer, Picker } from 'native-base';
import css from '../style/css';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import DataPicker from 'react-native-datepicker';
import DateTimePicker from "@react-native-community/datetimepicker";
import api from '../services/api';

export default function CadConsulta ({ route, navigation }){


  const { user } = route.params;
  const today = new Date();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dataFormatada, setDataFormatada] = useState('');
  const [horaFormatada, setHoraFormatada] = useState('');
  const [locais, setLocais] = useState([]);
  const [especialidade, setEspecialidade] = useState('Dermatologia');
  const [localSelecionado, setLocalSelecionado] = useState('');


  useEffect(() => {
    async function listagem(){
      const response = await api.get('/locaisConsulta');
      setLocais(response.data);
    }
    listagem();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);  
      formattedDate = (currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear())    
      setHoraFormatada(currentDate.getHours() + "h:" + currentDate.getMinutes()+ "m")
      setDataFormatada(formattedDate);
      setEspecialidade(especialidade);
      setLocalSelecionado(localSelecionado);
  };

  async function cadastro() {
    if(dataFormatada != '' && horaFormatada  != '' && especialidade  != ''){
      const consultaExame = {
        data:dataFormatada,
        horario:horaFormatada,
        status:'Agendado',
        tipoConsulta:'Consulta',
        especialidade: especialidade,
        idusuario: user,
        idlocais: localSelecionado
      }

      const response = await api.post('/usu/consultas', consultaExame)

      if(response.data != null){
        setEspecialidade('Dermatologia');
        setDataFormatada('');
        setHoraFormatada('');
        navigation.navigate('Minhas Consultas');
      }else{
        Alert.alert('OOPS!', 'Erro ao Agendar Consulta', [
          {text: 'Entendido'}
        ]);
      }
    }else{
      Alert.alert('OOPS!', 'Preencha todos os campos!', [
        {text: 'Entendido'}
      ]);
    }
  }

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
    }

  return (
    <View style={styles.container}>         
      <StatusBar backgroundColor="#008B8B"/>
        <View style={css.containerHeader}>
          <View style={styles.IconPosicao}>
            <Feather name="arrow-left" size={25} onPress={()=>navigation.navigate('Agendar Consultas')}/>
          </View>
        </View>  
        <View style={{flex:1,}}>
          <View style={{paddingLeft:10, alignItems:'center', margin:10}}>
            <Text style={{fontSize:23, color: '#05375a',fontWeight:'bold',}}>Agendar Consulta</Text>
          </View>
            <View>
            <Text style={[styles.text_footer,{marginTop:40, marginLeft:10}]}>Especialidade</Text>
              <Picker onChange={onChange}  selectedValue={especialidade} onValueChange={itemValue => setEspecialidade(itemValue)} style={{ height: 50, width: '100%', marginBottom: 10, marginLeft:5, color:'black'}}> 
                <Picker.Item label="Dermatologia" value="Dermatologia" />
                <Picker.Item label="Ortopedia" value="Ortopedia" />
                <Picker.Item label="Cardiologia" value="Cardiologia" />
                <Picker.Item label="Ginecologia e Obstetrícia" value="Ginecologia e Obstetrícia" />
                <Picker.Item label="Neurologia" value="Neurologia" />
                <Picker.Item label="Endocrinologia" value="Endocrinologia" />
                <Picker.Item label="Urologia" value="Urologia" />
              </Picker>
            <Text style={[styles.text_footer,{marginTop:15, marginLeft:10}]}>Local</Text>
              <Picker onChange={onChange}  selectedValue={localSelecionado} onValueChange={itemValue => setLocalSelecionado(itemValue)} style={{ height: 50, width: '100%', marginBottom: 10, marginLeft:5, color:'black'}}> 
                {
                  locais.map(local=>(
                    <Picker.Item key={local.idlocais} label={local.nome} value={local.idlocais} />
                  ))
                }
              </Picker>
              <Text style={[styles.text_footer,{ marginLeft:10}]}>Data</Text>
              <View style={{backgroundColor:'#cfd8dc', height:40, width:110, justifyContent:'center', alignItems:'center', borderRadius:8, borderColor:'black', borderWidth:2,marginLeft:10, marginTop:5  }}>
                <Text style={{ fontSize:13, fontWeight:'bold'}}>{dataFormatada.toString()}</Text>
              </View>
              <View style={{  justifyContent:'center',}}>
                <View style={{ width: 113, height:30, alignItems:'center', borderRadius:10,  justifyContent:'center',  marginLeft:10, marginTop:10, backgroundColor:'#01ab9d'}}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <Text style={{fontSize: 14, fontWeight:'bold', color:'#ffff'}}>SELECIONAR</Text>
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
                      maximumDate = { new  Date ( 2021 ,  12 ,  30 ) }
                      style={{backgroundColor: "green"}}
                    />
                  )}
                </View>
                
              <Text style={[styles.text_footer,{marginTop:10, marginLeft:10}]}>Horário</Text>
                <View style={{backgroundColor:'#cfd8dc', height:40, width:110, justifyContent:'center', alignItems:'center', borderRadius:8, borderColor:'black', borderWidth:2,marginLeft:10, marginTop:5 }}>
                  <Text style={{margin:20, fontSize:14, fontWeight:'bold'}}>{horaFormatada.toString()}</Text>
                </View> 
              <View style={{  justifyContent:'center', }}>
              <View style={{ width: 113, height:30, alignItems:'center', borderRadius:10,  justifyContent:'center',  marginLeft:10, marginTop:10, backgroundColor:'#01ab9d'}}>
                  <TouchableOpacity onPress={showDatepicker}>
                    <Text style={{fontSize: 14, fontWeight:'bold', color:'#ffff'}}>SELECIONAR</Text>
                  </TouchableOpacity>
              </View>
              </View>    
            </View>
            
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity   style={[styles.signIn, {borderColor: '#009387', borderWidth: 1,width:200 , height:50  }]} onPress={() => cadastro()}>
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
