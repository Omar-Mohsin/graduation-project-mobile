import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useMemo} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  SelectAllCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../../../redux/cart/cartSlice';
import DetailSection from './DetailSection';
const Cart = () => {
  const cart = useSelector(SelectAllCart);

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const filteredCart = useMemo(() => {
    const map = new Map(cart.map(pos => [pos.id, pos]));
    return [...map.values()];
  }, [cart]);


  const exchangeRate = {
    USD: 1,
    JD: 0.709,
  };

 
  
 
  const clearCartHandler = () => {
    dispatch(clearCart());
  };
  const itemCartQunitity = item => {
    return cart.filter(cartItem => item.id === cartItem.id).length;
  };

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = item => {
    dispatch(removeFromCart(item.id));
  };
 

  const totalPrice = (product) => {
    const newArray = cart.filter((item) => item.id === product.id).length;
    const totalPrice = newArray * product.price * exchangeRate[selectedCurrency];
    return totalPrice.toFixed(2);
  };  
  return (
    <View style={styles.container}>
      {filteredCart.length > 0 ? (
        <>
          <View style={styles.header}>
            <Pressable
              style={styles.clearCartButton}
              onPress={clearCartHandler}>
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </Pressable>
          </View>
          <SwipeListView
            data={filteredCart}
            renderItem={({item}) => (
              <View key={item.id} style={styles.cardContainer}>
                <Image source={{uri: item.image_url}} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                      <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                      {itemCartQunitity(item)}
                    </Text>
                    <TouchableOpacity onPress={() => addItemToCart(item)}>
                      <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardPrice}>Price: ${item.price}</Text>
                  <Text style={styles.totalPrice}>
                  Total: {totalPrice(item)}
                  </Text>
                </View>
              </View>
            )}
            renderHiddenItem={data => (
              <View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeItemFromCart(data.item)}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            )}
            rightOpenValue={-100}
          />
          <DetailSection></DetailSection>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Empty Cart</Text>
      )}
    </View>
  );
};

export default React.memo(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEEEEE',
  },
  header: {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  clearCartButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  clearCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchButton: {
    marginLeft: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  cardImage: {
    objectFit: 'contain',
    width: 130,
    height: 170,
    marginTop: 10,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#176B87',
  },
  cardDescription: {
    fontSize: 14,
    color: 'black',
    marginTop: 7,
    marginBottom: 7,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 5,
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: 'black',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#64CCC5',
  },
  cardPrice: {
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 5,
    color: '#FF5722',
  },

  removeButton: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    backgroundColor: 'red',
    height: '98%',
    width: 100,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});
