import React, { Component } from 'react'
import DeckView from './DeckView'
import { KeyboardAvoidingView, TouchableOpacity, Text, TextInput, Alert } from 'react-native'
import { saveDeckTitle } from '../utils/helpers'
import view from '../style/view'
import text from '../style/text'
import button from '../style/button'
import * as actions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CreateDeck extends Component {
  state = {
    title: ''
  }
  onSubmit = () => {
    const { title } = this.state
    const { navigate, goBack } =this.props.navigation
    const { addDeck, decks } = this.props

    if(title.length === 0){
      Alert.alert('Message', 'Title is required',[text:'OK'])
    }else{
      let isMatch = Object.keys(decks).indexOf(title) >=0 ? true : false
      if(isMatch){
        Alert.alert('Message', 'Deck is already exist',[text:'OK'])
      }else{
        saveDeckTitle(title)
        addDeck(title)
        goBack()
        navigate('Deck',{name:`${title}`})
      }
    }
  }

  render() {
    const { title } = this.state

    return(
      <KeyboardAvoidingView style={view.container}>
        <Text style={[text.deckTitleTxt, {color:'black'}]}>
            What is the title of your new deck ?
        </Text>
        <TextInput style={text.textInput} value={ title } onChangeText={(text) => this.setState({title: text})}/>
        <TouchableOpacity style={button.submitBtn} onPress= {this.onSubmit}>
          <Text style={text.submitTxt}>Submit</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck)
