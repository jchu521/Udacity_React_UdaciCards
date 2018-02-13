import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import reducers from '../reducers/index'
import { bindActionCreators } from 'redux'
import text from '../style/text'
import view from '../style/view'
import button from '../style/button'

class CreateCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  saveCard = () => {
    const { name } =this.props.navigation.state.params
    const { question, answer } = this.state
    const { goBack } =this.props.navigation
    const { addCard } =this.props
    const card = {
      question: question,
      answer: answer,
    }

    if(question.length === 0 || answer.length === 0){
      Alert.alert('Warning','Missing textfield',[{text: 'OK'}])
    }else{
      addCardToDeck(name, card)
      addCard(name, card)
      goBack()
    }

  }
  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView style={view.container}>
        <Text style={text.QandAText}>Enter Question:</Text>
        <TextInput style={text.textInput} value={ question } onChangeText={(text) => this.setState({question: text})}/>
        <Text style={text.QandAText}>Enter Answer:</Text>
        <TextInput style={text.textInput} value={ answer } onChangeText={(text) => this.setState({answer: text})}/>
        <TouchableOpacity style={button.submitBtn} onPress={this.saveCard }>
          <Text style={text.submitTxt}>Submit </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => ({
  decks: state
})
const mapDispatchToProps = (dispatch) => (
   bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps,mapDispatchToProps)(CreateCard)
