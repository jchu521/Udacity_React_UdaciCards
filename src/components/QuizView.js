import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { getDeck, clearLocalNotification,setLocalNotification } from '../utils/helpers'
import QuestionAnswerView from './QuestionAnswerView'
import ScoreView from './ScoreView'
import view from '../style/view'
import text from '../style/text'
import button from '../style/button'

export default class QuizView extends Component {
  state= {
    deck:{},
    countCorrect: 0,
    currentCardIndex: 0,
    completeQuizs: false,
    showQuestion: true,
  }

  componentWillMount() {
    const { deck } = this.props.navigation.state.params
    this.setState({deck: deck})
  }

  checkAnswer = (isCorrect) => {
    const { currentCardIndex, deck } = this.state
    if(isCorrect){
      // score
      this.setState((prevState) => ({
        countCorrect: prevState.countCorrect + 1,
      }))
    }
    this.setState((prevState) => ({
      currentCardIndex: prevState.currentCardIndex + 1,
      showQuestion: true,
    }))
    //quiz complete
    if(currentCardIndex === deck.questions.length-1 ){
      this.setState({ completeQuizs: true})
      //reset notifications time 
      clearLocalNotification().then(setLocalNotification)
    }
  }
  toggleCard = () =>{
    this.setState((state) => ({showQuestion: !state.showQuestion}))
  }
  restart = () =>{
    this.setState({
      countCorrect: 0,
      currentCardIndex: 0,
      showQuestion: true,
      completeQuizs: false,
    })
  }

  render() {
    const { currentCardIndex, deck, completeQuizs, showQuestion, countCorrect } = this.state
    const { goBack } =this.props.navigation

    return (
      <View style={view.container}>
        {  (currentCardIndex !== deck.questions.length ) ?
            <QuestionAnswerView currentCardIndex={currentCardIndex} deck={deck} onToggleCard ={this.toggleCard} showQuestion={showQuestion}/>
            :
            <ScoreView currentCardIndex={currentCardIndex} deck={deck} countCorrect={countCorrect}/>
        }
        { (completeQuizs) ?
          <View>
            <TouchableOpacity style={[button.QandAbtn,{backgroundColor: '#536DFE'}]} onPress={this.restart}>
              <Text style={text.QuizViewText}>Restart quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[button.QandAbtn,{backgroundColor: '#536DFE'}]} onPress={()=> goBack()}>
              <Text style={text.QuizViewText}>Return to deck</Text>
            </TouchableOpacity>
          </View>
           :
          <View>
            <TouchableOpacity style={[button.QandAbtn,{backgroundColor: '#ADD8E6'}]} onPress={() => {this.checkAnswer(true)}}>
              <Text style={text.QuizViewText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[button.QandAbtn,{backgroundColor: '#ADD8E6'}]} onPress={() => {this.checkAnswer(false)}}>
              <Text style={text.QuizViewText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}
