import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

const BestSeller = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://watermelon1.pythonanywhere.com/api/statistics/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.quantitySold}>Quantity Sold: {item.quantity_sold}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Sellers</Text>
      <View style={styles.centeredFlatList}>
        {data?.top_items ? (
          <FlatList
            data={data.top_items}
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default BestSeller;
const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      padding : 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    centeredFlatList: {
      alignItems: 'center',
      marginTop: 100,
    },
    productContainer: {
      marginRight: 15,
    },
    productImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    productName: {
      fontSize: 16,
      marginTop: 5,
    },
    productPrice: {
      fontSize: 14,
      color: '#FF5722',
    },
    quantitySold: {
      fontSize: 14,
      color: 'green',
    },
  });