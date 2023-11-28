import { StyleSheet, Text, View } from 'react-native'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import {store , persistor} from '../../redux/store'
import { PersistGate } from 'redux-persist/integration/react';

const AppWrapper = () => {
  return (

    <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>

      <App />
      </PersistGate>

    </Provider>
  )
}

export default AppWrapper

const styles = StyleSheet.create({})