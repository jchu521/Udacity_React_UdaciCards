import C from '../constants'

const decks = (state={}, action) => {
  const {decks, title, card} = action

  switch (action.type) {
    case C.GET_DECKS:
      return {...state,...decks}
    case C.ADD_DECK:
      return {...state,[title]: {
        title: title,
        questions:[]
      }}
    case C.ADD_CARD:
      const questions = state[title].questions
      questions.push(card)
      return {
        ...state,
        [title]: {
            title: title,
            questions
        }
      }
    default:
      return state
  }
}

export default decks
