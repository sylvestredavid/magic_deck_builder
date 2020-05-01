import React from 'react'
import GestureRecognizer from "react-native-swipe-gestures";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import Card from "../components/Card";

export default class CardsScreen extends React.Component {

    deck = {
        colors: [],
        cards: []
    };
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            indexToShow: 3,
        }
    }

    componentDidMount() {
        fetch('https://api.scryfall.com/cards/search?q=lang%3Afr&unique=printed_name')
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    cards: resJson.data
                })
            })
    }

    addToDeck = () => {
        const actualCard = this.state.cards[this.state.indexToShow]
        const card = {
            id: actualCard.id,
            img: this.getImg(actualCard),
            cout: this.calculCout(actualCard),
            type: this.getType(actualCard)
        }
        this.deck.cards.push(card);
        this.addColorsToDeck(actualCard)
        console.log(this.deck)
        this.incrementIndexToShow()
    }

    getType = (card) => {
         card = card.card_faces ? card.card_faces[0] : card
        if (card.printed_type_line) {
            return card.printed_type_line
        } else {
            return card.type_line
        }
    }

    calculCout = (card) => {
        let mana = card.card_faces ? card.card_faces[0].mana_cost : card.mana_cost;
        mana = mana.replace(/[{}]/gi, '')
        let cout = 0;

        if(mana[0] !== "B" && mana[0] !== "U" && mana[0] !== "R" && mana[0] !== "W" && mana[0] !== "G") {
            cout += +mana[0];
            cout += mana.length -1;
        } else {
            cout += mana.length
        }

        return cout
    }

    addColorsToDeck = (card) => {
        card = card.card_faces? card.card_faces[0] : card
        card.colors.forEach(color => {
            if(!this.deck.colors.includes(color)) {
                this.deck.colors.push(color)
            }
        })
    }

    getImg = (card) => {
        if (card.card_faces) {
            return card.card_faces[0].image_uris.png
        } else {
            return card.image_uris.png
        }
    }

    incrementIndexToShow = () => {
        if (this.state.indexToShow < this.state.cards.length - 1) {
            this.setState({
                indexToShow: this.state.indexToShow += 1
            })
        }
    }

    render() {
        return (
            <GestureRecognizer style={styles.container}
                               onSwipeRight={this.incrementIndexToShow}
                               onSwipeLeft={this.addToDeck}>
                {this.state.cards.length > 0 && (
                    <Card card={this.state.cards[this.state.indexToShow]} />
                )
                }
            </GestureRecognizer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    }
});
