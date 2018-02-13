import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { getDeck } from '../utils/helpers'
import { StackNavigator } from 'react-navigation'
import {AppLoading} from 'expo'
import view from '../style/view'
import text from '../style/text'
import button from '../style/button'
import color from '../style/colors'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import reducers from '../reducers/index'
import { bindActionCreators } from 'redux'

class DeckView extends Component{
  state= {
    deck: {},
    ready: false,
  }
  componentWillMount() {
    getDeck(this.props.navigation.state.params.name).then((deck) =>
      this.setState({ready: true}))

  }

  startQuiz = () => {
    const { navigate } = this.props.navigation
    const { decks } = this.props
    const { name } = this.props.navigation.state.params

    if(decks[name].questions.length === 0 ){
      Alert.alert("Message", "No Card found, please add card",[{text: 'OK'}])
    }else{
      navigate('QuizView', {deck: decks[name]})
    }
  }

  addCard = () =>{
    const { name } = this.props.navigation.state.params
    const { navigate } =this.props.navigation

    navigate('addCard', {name: name})
  }


  render() {
    const { decks } = this.props
    const { navigate } =this.props.navigation
    const { name } = this.props.navigation.state.params

    if (!this.state.ready) {
      return (<AppLoading/>)
    }
    return(
      <View style={view.deckViewcontainer}>
        <Text style={[text.deckTitleTxt,{color: 'black',fontSize: 50}]}>{decks[name].title}</Text>
        <Text style={[text.totalCardTxt,color.grey]}>{decks[name].questions.length} cards </Text>
        <TouchableOpacity style={button.deckBtn} onPress={this.addCard }>
          <Text style={text.btnTxt}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button.deckBtn} onPress={ this.startQuiz }>
          <Text style={text.btnTxt}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = (state) => ({
  decks: state
})
const mapDispatchToProps = (dispatch) => (
   bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps,mapDispatchToProps)(DeckView)
