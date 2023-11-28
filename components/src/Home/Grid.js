import {StyleSheet, Text, View ,Pressable , Image , TouchableOpacity , FlatList} from 'react-native';
import Reactv , {useState} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { SelectAllProducts } from '../../../redux/product/productSlice';
import { addToCart } from '../../../redux/cart/cartSlice';
const Grid = () => {

const products = useSelector(SelectAllProducts);
const dispatch = useDispatch();
const [showSuccessMessage, setShowSuccessMessage] = useState(false);

const addToCartHandler = (item) => {
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
          <Image source={{uri: item.image}} style={styles.gridImage} />
        
        </View>
        <Text style={styles.gridTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.gridPrice}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCartHandler(item)}>
          <Text style={styles.addToCartButtonText}>+</Text>
        </TouchableOpacity>
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
});
