import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SelectAllProducts} from '../../../redux/product/productSlice';
import {addToCart} from '../../../redux/cart/cartSlice';
import {SelectUser} from '../../../redux/auth/authSlice';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const Column = () => {
  const products = useSelector(SelectAllProducts);
  const dispatch = useDispatch();
  const user = useSelector(SelectUser);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [forceRender, setForceRender] = useState(false);

  const addToCartHandler = item => {
    dispatch(addToCart(item));

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://watermelon1.pythonanywhere.com/items/api/${user.id}/favorite-items/`,
        );
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    fetchData();
  }, [forceRender]);
  const isProductInFavorites = productId => {
    return !favorites.favorite_items?.some(
      favProduct => favProduct.id === productId,
    );
  };

  const addToFavorite = async product => {
    const data = {
      userId: user.id,
      productId: product.id,
    };
    try {
      const response = await fetch(
        'https://watermelon1.pythonanywhere.com/items/api/favorite/add/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }
      setForceRender(!forceRender);
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    }
  };

  const removeFavorite = async item => {
    const data = {
      userId: user.id,
      productId: item.id,
    };

    try {
      const response = await fetch(
        `https://watermelon1.pythonanywhere.com/items/api/favorite/remove/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to remove favorite');
      }
      setForceRender(!forceRender);
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

  return (
    <>
      <FlatList
        data={products}
        renderItem={({item}) => {
          return (
            <Pressable key={item.id}>
              <View style={styles.cardContainer}>
                <Image
                  source={{uri: item.image_url}}
                  style={styles.cardImage}
                />

                <View style={styles.cardInfo}>
                  <Text
                    style={styles.cardTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.name}
                  </Text>
                  <Text style={{color: 'green', marginBottom: 5, fontSize: 17}}>
                    {item.stocks} stocks
                  </Text>
                  <Text style={styles.cardPrice}>${item.price}</Text>

                  {item.stocks > 0 ? (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() => {
                          addToCartHandler(item);
                        }}>
                        <Text style={styles.addToCartButtonText}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                      {user ? (
                        isProductInFavorites(item.id) ? (
                          <TouchableOpacity
                            onPress={() => {
                              addToFavorite(item);
                            }}>
                            <FavIcon
                              name="favorite-border"
                              color={'red'}
                              size={30}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              removeFavorite(item);
                            }}>
                            <FavIcon name="favorite" color={'red'} size={30} />
                          </TouchableOpacity>
                        )
                      ) : (
                        <></>
                      )}
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <View style={styles.OutOfStockButton}>
                        <Text style={styles.addToCartButtonText}>
                          Out Of Stock
                        </Text>
                      </View>
                      {user && isProductInFavorites(item.id) ? (
                        <TouchableOpacity
                          onPress={() => {
                            addToFavorite(item);
                          }}>
                          <FavIcon
                            name="favorite-border"
                            color={'red'}
                            size={30}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            removeFavorite(item);
                          }}>
                          <FavIcon name="favorite" color={'red'} size={30} />
                        </TouchableOpacity>
                      )}
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
    backgroundColor: 'grey',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
});
