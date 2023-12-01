import { View, Text,StyleSheet,  TextInput, TouchableOpacity, ScrollView , Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import { useSelector , useDispatch } from 'react-redux';
import { SelectAllCart , clearCart } from '../../../redux/cart/cartSlice';
import { SelectUser } from '../../../redux/auth/authSlice';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(SelectAllCart);
  const user = useSelector(SelectUser);
  const [cartSummary, setCartSummary] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    city: '',
    postalCode: '',
    buildingNumber: '',
    phoneNumber: '',
    additionalDeliveryInfo: '',
  });

  const CheckoutHanadler = async() => {
    const data = {
       id :user.id,
       cartSummary,
       deliveryInfo,
     };
    console.log("Form data:", data);

    fetch("http://localhost:8000/checkout/api/place_order/", {
      // put your url
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          console.log("successful!");
          navigation.navigate('Home');
          dispatch(clearCart());
        } else {
          console.error(" failed:", responseData.error);
        }
      });
  };
  return (
    <View>
        <Button title='chekcout' onPress={CheckoutHanadler}></Button>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({})