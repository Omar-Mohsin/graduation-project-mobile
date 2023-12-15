import { StyleSheet, Text, View  ,Pressable} from 'react-native'
import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { SelectAllCart } from '../../../redux/cart/cartSlice'
import { SelectUser } from '../../../redux/auth/authSlice'
import {useNavigation} from '@react-navigation/native';

const DetailSection = () => {   

    const cart = useSelector(SelectAllCart);
    const user = useSelector(SelectUser); 
    const navigation = useNavigation();

    const calculateSubtotal = () => {
        return cart.reduce(
          (subtotal, item) => subtotal + item.price,
          0,
        );
      };
    
      const calculateTax = () => {
        return calculateSubtotal() * 0.05;
      };
    
      const calculateGrandTotal = () => {
        return calculateSubtotal() + calculateTax();
      };

      const moveToSignIn = () => { 
        navigation.navigate('Login');
      }
      const moveToCheckout=()=>{
        navigation.navigate('checkout');

      }
    

      return (
        <View>
          {cart.length > 0 && (
            <View style={styles.summaryContainer}>
              <Text style={styles.summaryText}>
                Subtotal: ${calculateSubtotal().toFixed(2)}{' '}
              </Text>
              <Text style={styles.summaryText}>
                Tax (5%): ${calculateTax().toFixed(2)}
              </Text>
              <Text style={styles.grandTotal}>
                Grand Total: ${calculateGrandTotal().toFixed(2)}
              </Text>
    
              {user !==null? ( // change it to user !== null ?
                <Pressable style={styles.button} onPress={moveToCheckout} >
                  <Text style={styles.CheckoutText}>Checkout</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.SignButton} onPress={moveToSignIn} >
                  <Text style={styles.CheckoutText}>Sign In</Text>
                </Pressable>
              )}
            </View>
          )}
        </View>
      );
}

export default DetailSection


const styles = StyleSheet.create({
    summaryContainer: {
      marginTop: 10,
      marginLeft: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    summaryText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 6,
      marginBottom: 6,
      color: '#176B87',
    },
    grandTotal: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 5,
      color: 'green',
    },
  
    button: {
      marginLeft: -2,
      marginTop: 20,
      borderRadius: 15,
      backgroundColor: '#34ba20',
      width: 150,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
    },
    SignButton: {
      marginLeft: -2,
      marginTop: 20,
      borderRadius: 15,
      backgroundColor: 'red',
      width: 150,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
  
    CheckoutText: {
      fontSize: 20,
      color: 'white',
    },
  });