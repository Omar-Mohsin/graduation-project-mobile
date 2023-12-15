import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {addUser} from '../../../../redux/auth/authSlice';
import {useDispatch} from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfrimPassword] = useState('');

  const usernameHandler = username => {
    setUsername(username);
  };
  const passwordHandler = password => {
    setPassword(password);
  };

  const emailHandler = email => {
    setEmail(email);
  };

  const confirmPasswordHandler = confirmPassword => {
    setconfrimPassword(confirmPassword);
  };

  const signUpHandler = async () => {
    const data = {
      username,
      email,
      password,
      confirmPassword,
    };

    fetch('http://localhost:8000/api/login/', { // change the url
      // change the url
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.success) {
          console.log('Registration successful!');
          dispatch(addUser(responseData));
          window.location.href = '/';
        } else {
          // Registration failed
          console.error('Registration failed:', responseData.error);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.welcoming}>
        <Text style={styles.welcomingText}>Welcome Back!</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={usernameHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="email-address"
          onChangeText={emailHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={passwordHandler}
        />
        <TextInput
          style={styles.input}
          placeholder="Confrim Password"
          secureTextEntry={true}
          onChangeText={confirmPasswordHandler}
        />
        <Pressable style={styles.SignInButton} onPress={signUpHandler}>
          <Text style={styles.signInText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  welcoming: {
    paddingTop: 250,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 24,
    alignItems: 'center',
  },
  welcomingText: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black',
  },

  formContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 200,
  },

  input: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  SignInButton: {
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: 'black',
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: 24,
    color: 'white',
  },
});
