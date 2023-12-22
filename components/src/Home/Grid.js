import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SelectAllProducts} from '../../../redux/product/productSlice';
import {addToCart} from '../../../redux/cart/cartSlice';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import {SelectUser} from '../../../redux/auth/authSlice';
import axios from 'axios';
const Grid = () => {
  const [favorites, setFavorites] = useState({});
  const [forceRender, setForceRender] = useState(false);
  const products = useSelector(SelectAllProducts);
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const user = useSelector(SelectUser);

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

  const addToCartHandler = item => {
    dispatch(addToCart(item));

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  const renderGridItem = ({item}) => {
    return (
      <Pressable style={styles.gridItem}>
        <View style={styles.gridImageContainer}>
          <Image source={{uri: item.image_url}} style={styles.gridImage} />
        </View>
        <Text style={styles.gridTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.name}
        </Text>
        <Text style={{color: 'green', marginBottom: 5, fontSize: 17}}>
          {item.stocks} stocks
        </Text>

        <Text style={styles.gridPrice}>${item.price}</Text>

        {user && isProductInFavorites(item.id) ? (
          <TouchableOpacity
            onPress={() => {
              addToFavorite(item);
            }}>
            <FavIcon name="favorite-border" color={'red'} size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              removeFavorite(item);
            }}>
            <FavIcon name="favorite" color={'red'} size={30} />
          </TouchableOpacity>
        )}
        {item.stocks > 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCartHandler(item)}>
            <Text style={styles.addToCartButtonText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.OutOfStockButton}>
            <Text style={styles.OutOfStockText}>X</Text>
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={products} renderItem={renderGridItem} numColumns={2} />
      {showSuccessMessage && (
        <View style={styles.massageContainer}>
          <Text style={{color: 'white'}}>Item added successfully!</Text>
        </View>
      )}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: '#EEEEEE',
    marginBottom: 65,
  },
  gridItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 5,
  },
  gridImageContainer: {
    position: 'relative',
  },
  gridImage: {
    objectFit: 'contain',
    width: 130,
    height: 170,
  },
  gridItemCount: {
    backgroundColor: '#64ccc5',
    position: 'absolute',
    top: 6,
    right: 7,
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemCountText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#053B50',
    textAlign: 'center',
  },
  gridPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#176B87',
    borderRadius: 50,
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    right: -3,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 23,
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
    backgroundColor: 'gray',
    borderRadius: 50,
    width: 37,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: -5,
    right: -3,
  },

  OutOfStockText: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
