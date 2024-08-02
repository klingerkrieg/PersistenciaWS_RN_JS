import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Text,View} from 'react-native';
import { SimpleList } from '../components/SimpleList';
import { Button, buttonTypes } from '../components/Button';

//Controller
import * as controller from '../controllers/Produtos';

import { styles } from './Estilo';

import "intl";
import 'intl/locale-data/jsonp/pt-BR'

export default function HomeScreen(props) {

    const listRef = React.useRef(null);
    const navigation = useNavigation(props);
  
  
    useEffect(() => {
        navigation.addListener('focus', payload => {
            listRef.current.update();
        })
    }, [navigation]);
  
  
    const updateList = () => {
      /* Contexto de ListagemSimples */
      listRef.current.setRefreshing(true);
      controller.getAll()
        .then((resp) => {
            if (resp.error){
              alert("Houve um erro ao carregar a lista");
              console.log(resp)
            } else {
              listRef.current.setItems(resp.data);
              listRef.current.setRefreshing(false);
            }
          }
        );
    }
  
  
    const editar = (item) =>{
      navigation.navigate("Cadastro",{id:item.id});
    }
  
    const deletar = (item) => {
      /* Contexto de ListagemSimples */
      //Esta função irá ser executada no contexto do ListagemSimples
      //Então ela poderá usar por exemplo this.update (Que é um método que existe
      //apenas dentro de ListagemSimples)
      if (confirm('Deseja excluir esse produto?')){
          controller.del(item.id).then((resp) => {
                if (resp.error){
                  alert("Houve um erro ao deletar");
                  listRef.current.update();
                } else {
                  listRef.current.update();
                }
              });
        }
    }
    
    
  
    return <View>
            {/* este componente ListagemSimples irá receber 
              e executar as funções definidas em ListagemProduto (Aqui) */}
              <SimpleList 
                        ref={listRef}
                        onPress={editar} 
                        onLongPress={deletar} 
                        update={updateList} 
                        item={(item) => <Text>{item.nome} - R$ {new Intl.NumberFormat('br',
                                                                        {styles:'currency', 
                                                                        currency: 'BRL',  
                                                                        minimumFractionDigits: 2}).format(item.preco)}
                                          </Text>}
                        navigate={navigation.navigate}
                        />
  
              
              <Button 
                type={buttonTypes.normal}
                onPress={() => navigation.navigate("Cadastro") }>Novo</Button>
              
          </View>
  
}

