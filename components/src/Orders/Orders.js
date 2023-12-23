import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SelectUser } from '../../../redux/auth/authSlice';
import { StyleSheet, Text, FlatList, View, ActivityIndicator } from 'react-native';

const Orders = () => {
  const user = useSelector(SelectUser);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://watermelon1.pythonanywhere.com/orders/api/user-orders/${user.id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setOrders(jsonData.orders || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  const sortedOrders = [...orders].sort((a, b) => b.order_id - a.order_id);

  const OrderCard = React.memo(({ order }) => (
    <View style={styles.orderCard} key={order.order_id}>
      <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
      <Text style={styles.totalPrice}>Total Price: ${order.total_price.toFixed(2)}</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item} key={item.id}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  ));

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : orders?.length > 0 ? (
        <FlatList
          data={sortedOrders}
          keyExtractor={(order) => order.order_id.toString()}
          renderItem={({ item }) => <OrderCard order={item} />}
        />
      ) : (
        <Text style={styles.emptyCartText}>No orders yet</Text>
      )}
    </View>
  );
};

export default React.memo(Orders);

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    marginVertical: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  itemName: {
    fontSize: 14,
  },
  itemQuantity: {
    color: '#777',
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },

  loadingIndicator: {
    marginTop: 20,
  },
});