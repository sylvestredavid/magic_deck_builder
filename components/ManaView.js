import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";


export default function ManaView(props){
    switch (props.mana) {
        case 'B':
            return <Image style={styles.manaImg} source={require('../assets/noir.png')}/>
        case 'U':
            return <Image style={styles.manaImg} source={require('../assets/bleu.png')}/>
        case 'R':
            return <Image style={styles.manaImg} source={require('../assets/rouge.png')}/>
        case 'W':
            return <Image style={styles.manaImg} source={require('../assets/blanc.png')}/>
        case 'G':
            return <Image style={styles.manaImg} source={require('../assets/vert.png')}/>
        case 'T':
            return <Image style={styles.manaTurn} source={require('../assets/turn.jpg')}/>
        default:
            return <View style={styles.mana}><Text style={styles.manaText}>{props.mana}</Text></View>
    }
}

const styles = StyleSheet.create({
    manaImg: {
        width: 18,
        height: 18,
        marginRight: 5
    },
    manaTurn: {
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 5
    },
    mana: {
        width: 18,
        height: 18,
        borderRadius: 8,
        backgroundColor: '#D8D3D0',
        marginRight: 5,
    },
    manaText: {
        position: 'absolute',
        top: -2,
        left: 4,
    }
});
