import React, { useEffect, useState } from 'react';
import {Text,View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './Estilo';
import { LabeledInput } from '../components/LabeledInput';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, buttonTypes } from '../components/Button';

import * as controller from '../controllers/Produtos';

export default function CadastroScreen(props){

  const route = useRoute();
  const navigation = useNavigation(props);
  
  let defaultId = -1;
  //se veio uma id via parametro
  //quer dizer que está editando algum produto
  if (route.params != undefined){
      if (route.params.id != undefined){
          defaultId = route.params.id;
      }
  }

  //cria os atributos de estado
  const [id, setId] = useState(defaultId);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
      /**
       * Ao abrir essa tela, busca do banco os dados do produto
       */
       if (id != -1){
          controller.get(id).then((resp) => {
              if (resp.error){
                  //Se der erro volta
                  alert("Houve um erro ao recuperar a renovação");
                  navigation.goBack();
              } else {

                  //preenche as variaveis com as informacoes que vieram do banco
                  setNome(resp.data.nome);
                  setPreco(resp.data.preco);
                  setDescricao(resp.data.descricao);
                  setLoading(false);
              }
          });
      } else {
          //se for um novo cadastro
          setLoading(false);
      }
  },[navigation])
  
  
  const limpar = () => {
      setId(-1);
      setNome("");
      setPreco(0);
      setDescricao("");
  }

  const salvarCallBack = (resp) => {
      if (resp.error){
        alert("Houve um erro ao salvar");
        console.log(resp)
      } else {
          alert("Produto salvo");
      }
  }

  
  const salvar = ()  => {
      let dados = {nome:nome,
                  preco:preco,
                  descricao:descricao};

      
      if (id == -1){
          controller.save(dados)
                      .then(salvarCallBack);
      } else {
          dados.id = id;
          controller.update(dados)
                      .then(salvarCallBack);
      }
  }


  if (loading == true) {
      return  <View style={styles.centerMessage}>
                  <Text style={styles.messages}>Carregando...</Text>
              </View>
  } else {
      return <ScrollView>

          <LabeledInput label="Nome" value={nome} 
                        onChangeText={text => setNome(text)} />

          <LabeledInput label="Preço" value={preco} type="currency"
                        onChangeText={text => setPreco(text)} />

          <LabeledInput label="Descrição" value={descricao} type="textarea"
                        onChangeText={text => setDescricao(text)} />

          <View style={styles.buttons}>

              <Button type={buttonTypes.success} 
                      style={{width:150}}
                      onPress={() => salvar()}>Salvar</Button>
          
              <Button type={buttonTypes.warning} 
                      style={{width:150}}
                      onPress={() => limpar()}>Limpar</Button>

          </View>
      </ScrollView>
  }
}
