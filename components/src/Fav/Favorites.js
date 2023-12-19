import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Pressable , ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { SelectUser } from '../../../redux/auth/authSlice';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Favorites = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const user = useSelector(SelectUser);
  const [favorites, setFavorites] = useState({});
  const [forceRender, setForceRender] = useState(false);
  const navigation = useNavigation();

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
    console.log('fetching data');
  }, [forceRender]);

  const removeFavorite = async (item) => {
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
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      {favorites.favorite_items?.length === 0 ? (
        <View style={styles.centeredContent}>
          <Text style={styles.noFavoritesText}>No Favorites</Text>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.addSomeText}>Please add some</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.productContainer}>
          {favorites.favorite_items?.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Image
                source={{ uri: product.image_url }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <TouchableOpacity
                onPress={() => {
                  removeFavorite(product);
                }}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove from Favorites</Text>
              </TouchableOpacity>
            </View>
          ))}
          {showSuccessMessage && (
            <View style={styles.massageContainer}>
            <Text style={styles.successMessage}>Item removed successfully!</Text>
          </View>
          )}
        </View>
      )}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addSomeText: {
    color: '#3498db',
    marginTop: 10,
  },
  productContainer: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    marginBottom: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 5,
    color: '#777',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  successMessage: {
    color: 'white',
    marginTop: 10,
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
});

export default Favorites;
