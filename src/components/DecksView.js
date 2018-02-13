import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Text, Button, TouchableHighlight, TouchableNativeFeedback,TouchableOpacity } from 'react-native'
import { getDecks, saveDeckTitle } from '../utils/helpers'
import CreateDeck from './CreateDeck'
import {AppLoading} from 'expo'
import button from '../style/button'
import text from '../style/text'
import * as actions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DecksView extends Component {

  renderItem = ({item}) => {
    const { navigate } =this.props.navigation
    return(
      <View >
      {/*https://github.com/react-navigation/react-navigation/issues/922*/}
        <TouchableOpacity style={button.createDeckBtn} onPress={() =>navigate('CreateDeck') }>
          <Text style={text.createDeckTxt}>
            Create New Deck
          </Text>
        </TouchableOpacity>
        {Object.keys(item).map(deckName =>
          <TouchableOpacity style={button.deckBtn} key={deckName} onPress={()=>navigate('Deck',{name:`${item[deckName].title}`})}>
            <Text style={text.deckTitleTxt}>
              {item[deckName].title}
            </Text>
            <Text style={text.totalCardTxt}>
              { item[deckName].questions.length !== 0 ? `${item[deckName].questions.length} cards` : '0 Card'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  render() {
    const { decks } = this.props

    return(
      <FlatList
        data={[decks]}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  decks:state
})

const mapDispatchToProps = (dispatch) => (
   bindActionCreators(actions, dispatch)
)

export default connect (mapStateToProps, mapDispatchToProps)(DecksView)
