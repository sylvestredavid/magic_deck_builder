import React from 'react';
import {StyleSheet, Dimensions, Image, View, Text} from 'react-native';
import AutoHeightImage from "react-native-auto-height-image";
import GestureRecognizer from 'react-native-swipe-gestures'
import CardsScreen from "./screens/CardsScreen";

export default class App extends React.Component {

    render() {
        return <CardsScreen />
    }
}
