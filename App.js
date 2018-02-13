import React from 'react';
import { TouchableOpacity, StyleSheet, Text, FlatList,View, Button } from 'react-native';
import DecksView from './src/components/DecksView'
import CreateDeck from './src/components/CreateDeck'
import DeckView from './src/components/DeckView'
import CreateCard from './src/components/CreateCard'
import QuizView from './src/components/QuizView'
import { StackNavigator } from 'react-navigation'
import view from './src/style/view'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers/index'
import thunk from 'redux-thunk'
import { clearDecks, getDecks, setLocalNotification } from './src/utils/helpers'
import { AppLoading } from 'expo'


const middleware = applyMiddleware(thunk)
let store = createStore(reducers, middleware)

export default class App extends React.Component {
  state = {
    ready: false,
    store: store,
  }
  componentWillMount(){
    getDecks().then((decks) => { this.setState({store: createStore(reducers, decks, middleware), ready: true})} )
  }
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    const { ready, store } = this.state

    if(!ready){
      return <AppLoading />
    }else{
      return (
        <Provider store={store}>
          <Stack />
        </Provider>
      )
    }

  }
}

const Home = ({ navigation })=>{
  return(
    <View style={view.container}>
      <DecksView navigation={navigation}/>
    </View>
  )
}

const Deck = ({ navigation }) =>(
  <DeckView navigation={navigation}/>
)

const AddCard = ({ navigation }) => (
  <CreateCard  navigation={navigation}/>
)

const quizView = ({ navigation }) => (
  <QuizView navigation={ navigation }/>
)

const createDeck = ({ navigation }) => (
  <CreateDeck navigation={ navigation } />
)

const Stack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions : {
      title: 'Decks',

    }
  },
  Deck: {
    screen: Deck,
    navigationOptions : ({ navigation }) => ({
      title: `${navigation.state.params.name} Deck`,

    }),
  },
  CreateDeck: {
    screen: createDeck,
    navigationOptions : ({ navigation }) => ({
      title: `Create Deck`,
    }),
  },
  addCard: {
    screen: AddCard,
    navigationOptions: ({ navigation, screenProps }) => ({
      title: 'Add Card',
    }),
  },
  QuizView: {
    screen: quizView,
  }

})
