import React, { Component } from 'react'
import { View, Text } from 'react-native'
import text from '../style/text'

export default class ScoreView extends Component {
  render() {
    const { deck, countCorrect } = this.props
    return (
      <View>
        <Text style={text.ScoreText}>{countCorrect} out of {deck.questions.length} correct</Text>
      </View>
    )
  }
}
