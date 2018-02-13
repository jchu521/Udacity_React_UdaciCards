import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

function setInitialDecks() {
  return (
    {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    }
  )

}

export function decks (results) {
  //console.log('d',results);
  return results === null ? setInitialDecks() : JSON.parse(results)
}

//return all of the decks along with their titles, questions, and answers.
export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks)
}

//take in a single id argument and return the deck associated with that id.
export function getDeck(id) {

  return getDecks().then((decks) => (decks[id]))
}

//take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
  getDecks().then((decks) => {
    if (!decks[title]) {
      decks[title] = {
        title: title,
        questions: []
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    }
  })
}

//take in two arguments, title and card, and will add the card to the list of
// questions for the deck with the associated title.
export function addCardToDeck(title, {question, answer}) {

    getDecks().then((decks) => {
      decks[title]['questions'].push({question, answer})
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    })

}

export function clearDecks(){
  AsyncStorage.setItem(DECKS_STORAGE_KEY,'')
}



export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Start Quiz',
    body: "👋 don't forget to learn quiz",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(22)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
