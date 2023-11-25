import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import Orders from './Orders/Orders';
import SignIn from './Authentication/Sigin In/SignIn';

const App = () => {
  enableScreens();

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Store',
            tabBarLabel: 'store',
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            title: 'Cart',
            tabBarLabel: 'Cart',
          }}
        />

        <>
          <Tab.Screen
            name="Orders"
            component={Orders}
            options={{
              title: 'Orders',
              tabBarLabel: 'Orders',
            }}
          />
        </>
        <Tab.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
            tabBarLabel: 'Sign In',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
