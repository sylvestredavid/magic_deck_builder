import {
    addDeck,
    deleteDeck,
    getDeckByUserId,
    updateDeck
} from '../controllers/deckController'
import {loginRequired} from '../controllers/userController'

export const deckRoutes = (app) => {
    app.route('/decks')
        .post(loginRequired, addDeck)

    app.route('/deck/:deckId')
        .put(loginRequired, updateDeck)
        .delete(loginRequired, deleteDeck)

    app.route('/deckByUserId/:userId')
        .get(getDeckByUserId)
}
