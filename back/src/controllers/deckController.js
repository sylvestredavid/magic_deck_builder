import mongoose from 'mongoose'
import { DeckSchema } from '../models/deckModel'

const Deck = mongoose.model('decks', DeckSchema)

/*
*ajouter un deck
*/
export const addDeck = (req, res) => {
    let newDeck = new Deck(req.body)

    newDeck.save((err, deck) => {
        if(err) {
            res.send(err)
        }
        res.json(deck)
    })
}

/*
*trouver les decks d'un utilisateur
*/
export const getDeckByUserId = (req, res) => {
    Deck.find({userId : req.query.userId}, (err, decks) => {
        if(err) {
            res.send(err)
        }
        res.json(decks)
    })
}

/*
*modifier un deck
*/
export const updateDeck = (req, res) => {
    Deck.findOneAndUpdate({ _id: req.params.deckId}, req.body, {new: true}, (err, deck) => {
        if (err) {
            res.send(err)
        }
        res.json(deck)
    })
}

/*
*supprimer un deck
*/
export const deleteDeck = (req, res) => {
    Deck.remove({ _id: req.params.deckId}, (err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer deck avec succès"})
    })
}
