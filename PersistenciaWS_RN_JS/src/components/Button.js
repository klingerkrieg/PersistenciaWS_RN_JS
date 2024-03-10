import React, { useState, useCallback } from 'react';
import { Text, Pressable, StyleSheet} from 'react-native';

export const buttonTypes = {
    success:'#38c23c',
    warning:'#e69834',
    normal:'#7db4ff'
}

const styles = StyleSheet.create({
    button:{
        height:50,
        margin:15,
    },
    buttonText:{
        fontSize:global.normalFontSize,
        paddingTop:10,
        textAlign:'center',
        color:'#ffffff',
      },
});

export function Button(props){
    
    return (
        <Pressable
                style={[styles.button,{backgroundColor:props.type},props.style]}
                onPress={() => props.onPress()}
            >
            <Text style={styles.buttonText}>
                {props.children}
            </Text>
        </Pressable>
    );
};