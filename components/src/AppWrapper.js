import { StyleSheet, Text, View } from 'react-native'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import {store} from '../../redux/store'
const AppWrapper = () => {
  return (

    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper

const styles = StyleSheet.create({})