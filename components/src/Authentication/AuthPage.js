import {StyleSheet, View, Switch} from 'react-native';
import React, {useState} from 'react';
import LoginIn from './LogIn/LoginIn';
import SignUp from './Sigin Up/SignUp';
const AuthPage = () => {
  const [toggle, setToggle1] = useState(false);


  const onSwitchHandler = () => {
    setToggle1(!toggle);
  };

  return (
    <View>
        <Switch value={toggle} onValueChange={onSwitchHandler} />
      
      {!toggle ? <LoginIn /> : <SignUp />}
    </View>
  );
};

export default AuthPage;

const styles = StyleSheet.create({

 
});
