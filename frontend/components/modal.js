<Modalize ref={modalizeRef} snapPoint={450} modalHeight={470}>
    <View style={{backgroundColor:'#e0e0e0'}}>
        <View style={{flex:1,justifyContent:'center', alignItems:'stretch', backgroundColor:'#80cbc4',margin:10, borderRadius: 10,  borderBottomColor:'#e0e0e0',borderRightColor:'#e0e0e0',borderRightWidth:2 ,borderBottomWidth:2,}}>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                Nome:  <Text style={{fontSize:15, color:'red'}}>{item.nome}</Text> 
            </Text>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                CEP:  <Text style={{fontSize:15, color:'red'}}>{item.cep}</Text>
            </Text>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                Endereço:  <Text style={{fontSize:15, color:'red'}}>{item.endereco}</Text>
            </Text>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                Latitude:  <Text style={{fontSize:15, color:'red'}}>{item.latitude}</Text>
            </Text>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                Longitude:  <Text style={{fontSize:15, color:'red'}}>{item.longitude}</Text>
            </Text>
            <Text style={{color: 'black', fontSize:18, margin:10}}>
                Descrição:  <Text style={{fontSize:15, color:'red'}}>{item.descricao}</Text>
            </Text>
        </View>

        <View style={{flex:1, height:180, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <TouchableOpacity onPress={() => excluirLocais(item.idlocais)} style={[styles.botao]}>
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                     <Text style={[styles.textSign, {color:'#fff'}]}>Editar</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirLocais(item.idlocais)} style={[styles.botao]}>
                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                    <Text style={[styles.textSign, {color:'#fff'}]}>Excluir</Text>
            </LinearGradient>
            </TouchableOpacity>
        </View>
    </View>
</Modalize>