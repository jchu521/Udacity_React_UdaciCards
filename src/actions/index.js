import C from '../constants'

export const getDecksAction = (decks) => {
  return {
    type: C.GET_DECKS,
    decks
  }
}

export const addDeck = (title) => {
  return {
    type: C.ADD_DECK,
    title
  }
}

export const addCard = (title, card) => {

  return {
    type: C.ADD_CARD,
    title,
    card
  }
}
