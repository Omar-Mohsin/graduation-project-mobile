import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './Cart';
import Checkout from './Checkout';
const CartStack = () => {

    const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
    <Stack.Screen
      name="cart"
      component={Cart}
    />
    <Stack.Screen name="checkout" component={Checkout} />
  </Stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})