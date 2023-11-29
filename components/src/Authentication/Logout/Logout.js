import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { removeUser } from '../../../../redux/auth/authSlice'
import { useDispatch } from 'react-redux'
const Logout = () => {

const dispatch = useDispatch();
const logoutHandler = () => {

  dispatch(removeUser());
}
  return (
    <View>
      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})