import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { SelectAllCart, clearCart } from '../../../redux/cart/cartSlice';
import { SelectUser } from '../../../redux/auth/authSlice';

const Checkout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(SelectAllCart);
  const user = useSelector(SelectUser);
  const [delivery_info, setDelivery_info] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    city: '',
    postalCode: '',
    buildingNumber: '',
    phoneNumber: '',
    additionalDeliveryInfo: '',
  });

  const handleChange = (name, value) => {
    setDelivery_info((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CheckoutHandler = async () => {
    const data = {
      id: user.id,
      cartSummary: {},
      delivery_info,
    };
    console.log('Form data:', data);

    fetch("http://localhost:8000/checkout/api/place_order/", { // change the url
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
          window.location.href = "/";
        } else {
          console.error(" failed:", responseData.error);
        }
      });
    navigation.navigate('Home');
    dispatch(clearCart());
  };

  return (
    <ScrollView style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(text) => handleChange('firstName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(text) => handleChange('lastName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Street Name"
            onChangeText={(text) => handleChange('streetName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            onChangeText={(text) => handleChange('postalCode', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Building Number"
            onChangeText={(text) => handleChange('buildingNumber', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(text) => handleChange('phoneNumber', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Additional Delivery Information"
            onChangeText={(text) => handleChange('additionalDeliveryInfo', text)}
          />
        </View>
      </View>

      <Button title="Place Order" onPress={CheckoutHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  formContainer: {
    marginTop : 50,
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Checkout;
