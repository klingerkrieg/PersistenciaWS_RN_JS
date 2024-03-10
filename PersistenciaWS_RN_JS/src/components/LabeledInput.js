import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, Pressable} from 'react-native';
//o checkbox do RN nao funciona no Expo 
//import CheckBox from '@react-native-community/checkbox';

//tem esse checkbox especifico pro expo
import Checkbox from 'expo-checkbox';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input'
import MaskInput, {Masks} from 'react-native-mask-input';

export const buttonTypes = {
    success:'#38c23c',
    warning:'#e69834',
    normal:'#7db4ff'
}

export const styles = StyleSheet.create({
    container:{
        margin:10
    },
    label:{
        color:'#000',
        fontSize:global.titleFontSize,
        fontWeight:'bold'
    },
    input:{
        fontSize:global.normalFontSize,
        paddingTop:10,
        color:'#000',
        backgroundColor:'#ddd',
    },
    error:{
        marginTop:-1,
        padding:5,
        color:'red',
        backgroundColor:'#ddd',
        fontWeight:'bold'
    },
    helper: {
        fontSize:global.normalFontSize,
    },
    row:{
        flexDirection:'row'
    }
});

export function LabeledInput(props){

    let type = props.type;
    if (type == undefined){
        type = 'text';
    }
    let readOnly = props.readOnly;
    if (readOnly == undefined){
        readOnly = false;
    }

    

    let input;
    if (type == 'checkbox'){
        input = <Checkbox value={props.value}
                    onValueChange={props.onValueChange}
                    style={styles.checkbox} />
    } else
    if (type == 'phone'){
        input = <TextInput style={styles.input} mask={Masks.BRL_PHONE} value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                        inputMode="numeric"
                        readOnly={readOnly} />
    } else
    if (type == 'cpf'){
        input = <MaskInput style={styles.input} mask={Masks.BRL_CPF} value={props.value}
                            onChangeText={text => props.onChangeText(text)}
                            inputMode="numeric"
                            readOnly={readOnly} />
    } else
    if (type == 'cep'){
        input = <TextInput style={styles.input} mask={Masks.ZIP_CODE} value={props.value}
                            onChangeText={text => props.onChangeText(text)}
                            inputMode="numeric"
                            readOnly={readOnly} />
    } else
    if (type == 'text'){
        input = <TextInput style={styles.input} value={props.value}
                        onChangeText={text => props.onChangeText(text)}
                        inputMode={props.inputMode}
                        readOnly={readOnly} />
    } else
    if (type == 'email'){
        input = <TextInput value={props.value} style={styles.input} 
                        inputMode="email"
                        onChangeText={text => props.onChangeText(text)}
                        readOnly={readOnly} />
    } else
    if (type == 'password'){
        input = <TextInput value={props.value} style={styles.input} 
                        secureTextEntry={true}
                        onChangeText={text => props.onChangeText(text)}
                        readOnly={readOnly} />
    } else
    if (type == 'textarea'){
        input = <TextInput value={props.value} style={styles.input}
                        multiline
                        rows={4}
                        readOnly={readOnly}
                        onChangeText={text => props.onChangeText(text)} />
    } else
    if (type == 'currency'){
        input = <CurrencyInput
                        value={props.value}
                        onChangeValue={text => props.onChangeText(text)}
                        inputMode="numeric"
                        style={styles.input}
                        prefix="R$"
                        delimiter="."
                        separator=","
                        precision={2}
                        readOnly={readOnly}
                    />
    } else {
        console.log("Tipo inexistente para o LabeledInput:"+type);
    }

    if (type == 'checkbox'){
        return (
            <View style={styles.container}>

                <View style={styles.row}>
                    {input}
                    <Pressable activeOpacity={0.8} 
                        onPress={() => props.onValueChange(!props.value)}>
                        <Text style={styles.label} >
                            {props.label}
                        </Text>
                    </Pressable>
                </View>
                {props.helper != undefined &&
                <Text style={styles.helper}>
                    {props.helper}
                </Text>
                }
                {props.error != undefined &&
                <Text style={styles.error}>
                    {props.error}
                </Text>
                }      
            </View>);
    } else {
        return (
            <GestureHandlerRootView style={styles.container}>

                <Text style={styles.label}>
                    {props.label}
                </Text>
                {input}

                {props.helper != undefined &&
                <Text style={styles.helper}>
                    {props.helper}
                </Text>
                }

                {props.error != undefined &&
                <Text style={styles.error}>
                    {props.error}
                </Text>
                }      
            </GestureHandlerRootView>);
    }
};