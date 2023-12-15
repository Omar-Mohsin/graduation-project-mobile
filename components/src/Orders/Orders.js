import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SelectUser} from '../../../redux/auth/authSlice';
const Orders = () => {
  const user = useSelector(SelectUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/orders/api/user-orders/${user.id}/`, // change the url
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setOrders(jsonData.orders || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const OrderCard = ({order}) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>Order ID: {order.order_id}</Text>
      <Text style={styles.totalPrice}>
        Total Price: ${order.total_price.toFixed(2)}
      </Text>
      <FlatList
        data={order.items}
        keyExtractor={item => item.name}
        renderItem={({item, index}) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View>
      {orders?.length > 0 ? (
        orders.map(order => {
          return (
            <FlatList
              data={orders} // change it to orders if it not works
              keyExtractor={order => order.order_id}
              renderItem={({item}) => <OrderCard order={item} />}
            />
          );
        })
      ) : (
        <Text style={styles.emptyCartText}>No orders yet</Text>
      )}
    </View>
  );
};

export default Orders;
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
});
