import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import text from '../style/text'
import button from '../style/button'

export default class QuestionAnswerView extends Component {

  render() {
    const { currentCardIndex, deck, completeQuizs, showQuestion, countCorrect, onToggleCard } = this.props
    return (
      <View>
        <Text style={text.QNumText}>Q{currentCardIndex + 1}/{deck.questions.length}</Text>
        <Text style={text.QandAText}>{ showQuestion ? deck.questions[currentCardIndex].question : deck.questions[currentCardIndex].answer}</Text>
        <TouchableOpacity style={button.QandAbtn} onPress={()=> onToggleCard()}>
          <Text style={text.QuizViewText}>{showQuestion ? "Show Answer" : "Show Question"}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
