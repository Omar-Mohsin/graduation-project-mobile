import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './Home/HomePage';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import SignIn from './Authentication/Sigin In/SignIn';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {
  enableScreens();

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'Store',
            tabBarLabel: 'store',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Cart',
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />

        <>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{
              title: 'Orders',
              tabBarLabel: 'Orders',
              tabBarIcon: ({ color, size }) => (
                <Icon name="truck" color={color} size={size} />
              ),
            }}
          />
        </>
        <Tab.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
            tabBarLabel: 'Sign In',
            tabBarIcon: ({ color, size }) => (
              <Icon name="sign-in" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
