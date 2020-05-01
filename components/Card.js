import React from 'react'
import GestureRecognizer from "react-native-swipe-gestures";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import ManaView from "./ManaView";

export default class Card extends React.Component {

    imageUri = () => {
        if (this.props.card.card_faces) {
            return this.props.card.card_faces[0].image_uris.art_crop
        } else {
            return this.props.card.image_uris.art_crop
        }
    }

    getName = () => {
        const card = this.props.card.card_faces ? this.props.card.card_faces[0] : this.props.card
        if (card.printed_name) {
            return card.printed_name
        } else {
            return card.name
        }
    }

    getType = () => {
        const card = this.props.card.card_faces ? this.props.card.card_faces[0] : this.props.card
        if (card.printed_type_line) {
            return card.printed_type_line
        } else {
            return card.type_line
        }
    }

    getMana = () => {
        let mana = this.props.card.card_faces ?
            this.props.card.card_faces[0].mana_cost :
            this.props.card.mana_cost
        if (mana.length > 0) {
            mana = mana.replace(/[{}]/gi, ' ')
            mana = mana.trim();
            let manaArray = mana.split('  ')
            return (
                <View style={styles.manaContainer}>
                    {manaArray.map((mana, index) => <ManaView mana={mana} key={index}/>)}
                </View>
            )
        }
    }

    getDescr = () => {
        const card = this.props.card.card_faces ? this.props.card.card_faces[0] : this.props.card
        let descr
        if (card.printed_text) {
            descr = card.printed_text;
        } else {
            descr = card.oracle_text
        }
        let ar = []
        while (descr.indexOf('{') !== -1) {
            const debut = <Text>{descr.substring(0, descr.indexOf('{'))}</Text>
            const image = <ManaView mana={descr.substring(descr.indexOf('{') + 1, descr.indexOf('{') + 2)}/>
            ar.push(debut)
            ar.push(image)
            descr = descr.substring(descr.indexOf('{') + 3)
        }
        ar.push(<Text>{descr}</Text>)
        return ar
    }

    getForceEndurance = () => {
        const card = this.props.card.card_faces ? this.props.card.card_faces[0] : this.props.card

        if (card.power && card.toughness)
            return <View style={styles.forceContainer}><Text>{card.power + '/' + card.toughness}</Text></View>
    }

    render() {
        return (
            <>
                <Image style={styles.image} source={{uri: this.imageUri()}}/>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textName}>{this.getName()}</Text>
                    <Text>{this.getType()}</Text>
                    <View>{this.getMana()}</View>
                    {this.getForceEndurance()}
                    <View style={styles.descr}>
                        {this.getDescr()}
                    </View>
                </View>
            </>
        )
    }

}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        width: win.width,
        height: win.width,
    },
    descriptionContainer: {
        marginVertical: 10,
        paddingHorizontal: 5,
        position: 'relative'
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 18
    },
    manaContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5
    },
    forceContainer: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        top: -5,
        right: 5,
        backgroundColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descr: {
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
