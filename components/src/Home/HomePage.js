import { StyleSheet, Text, View  , Image} from 'react-native'
import React , {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Column from './Column';
import Grid from './Grid';
import { useEffect } from 'react';
import { useDispatch  , useSelector} from 'react-redux';
import { fetchProducts } from '../../../redux/product/productSlice';
import { SelectAllProducts } from '../../../redux/product/productSlice';
const HomePage = () => {

    const [toggle, isToggle] = useState(false);
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(fetchProducts());
      }, []);
    const buttonHandler = () => {
      isToggle(!toggle);
    };
    const products = useSelector(SelectAllProducts);
    console.log(products) // testing
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <View style={styles.titleIcon}>
              <Image source={require('../../../assert/watermelon.png')} style={styles.Image} />
              </View>
            </View>
            <View style={styles.iconContainer}>
              <Icon
                name={!toggle ? 'th-large' : 'th-list'}
                size={25}
                onPress={buttonHandler}
                color="#333"
              />
            </View>
          </View>
    
          {toggle ? <Grid /> : <Column />}
        </View>
      );
    
}

export default HomePage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      padding: 3,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    titleContainer: {
      flexDirection: 'row',
      marginLeft: 10,
      alignItems: 'center', // Align items vertically
    },
    title: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    iconContainer: {
      marginRight: 5,
      padding: 5,
    },
    titleIcon: {
      marginRight: 10,
    },
    Image : { 
      width: 60,
      height: 50,
    }
  });