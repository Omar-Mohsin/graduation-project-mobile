import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {removeUser} from '../../../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';
const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(removeUser());
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={logoutHandler} style={styles.ButtonContainer}>
        <Text style ={styles.ButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default React.memo(Logout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    marginTop: 50,
  },
  ButtonText  : { 
    color : 'white',
    fontSize : 20,
  }
});