import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SelectAllProducts} from '../../../redux/product/productSlice';
import {addToCart} from '../../../redux/cart/cartSlice';
const Column = () => {
  const products = useSelector(SelectAllProducts);
  const dispatch = useDispatch();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const addToCartHandler = item => {
    dispatch(addToCart(item));

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  return (
    <>
      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <Pressable key={item.id}>
              <View style={styles.cardContainer}>
                <Image source={{uri: item.image}} style={styles.cardImage} />

                <View style={styles.cardInfo}>
                  <Text
                    style={styles.cardTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.title}
                  </Text>
                  <Text style={styles.cardPrice}>${item.price}</Text>

                  {true ? ( // item>0?
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => {
                        addToCartHandler(item);
                      }}>
                      <Text style={styles.addToCartButtonText}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.OutOfStockButton}>
                      <Text style={styles.addToCartButtonText}>
                        Out Of Stock
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
      {showSuccessMessage && (
        <View style={styles.massageContainer}>
          <Text style={{color: 'white'}}>Item added successfully!</Text>
        </View>
      )}
    </>
  );
};

export default Column;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardImage: {
    objectFit: 'contain',
    width: 130,
    height: 170,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#053B50',
  },
  cardPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: '#176B87',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  CartItemCount: {
    backgroundColor: '#64ccc5',
    position: 'absolute',
    top: 10,
    right: 7,
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CartItemCountText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  massageContainer: {
    display: 'flex',
    backgroundColor: '#4caf50',
    padding: '1rem',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    height: 50,
  },
  OutOfStockButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'inline-block',
    padding: ' 0.5rem 1rem',
    border: 'none',
    width: '100%',
    height: 50,
    borderRadius: 99,
    fontWeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    color: '#fff',
  },
});
