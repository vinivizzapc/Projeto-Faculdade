import  { StyleSheet} from 'react-native';

const css = StyleSheet.create({
    container: {
    flex: 1
},
containerHeader: {
    backgroundColor: '#008B8B',
    height: 50,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  IconPosicao:{
    marginTop: 10,
    marginLeft: 10
  },
  contColor:{
    backgroundColor:"#008B8B",
  },
  containerFooter:{
    backgroundColor:"#008B8B",
    borderTopEndRadius: 40
  }
})

  export default css;