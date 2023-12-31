import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from './Home/HomePage';
import CartStack from './Cart/CartStack';
import Orders from './Orders/Orders';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import FavIcon from 'react-native-vector-icons/MaterialIcons';
import Favorites from './Fav/Favorites';
import AuthPage from './Authentication/AuthPage';
import Logout from './Authentication/Logout/Logout';
import {SelectUser} from '../../redux/auth/authSlice';
import {useSelector} from 'react-redux';
import BestSeller from './BestSellers/BestSeller';
const App = () => {
  const user = useSelector(SelectUser);
  enableScreens();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
      }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            title: 'Store',
            tabBarLabel: 'store',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),

          }}
        />
        <Tab.Screen
          name="CartPage"
          component={CartStack}
          options={{
            title: 'Cart',
            tabBarLabel: 'Cart',
            headerShown: false,

            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="BestSeller"
          component={BestSeller}
          options={{
            title: 'Best Seller 🔥',
            tabBarLabel: 'Best Seller',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="fire" color={color} size={size} />
            ),
          }}
        />

        {user !== null ? (
          <>
            <Tab.Screen
              name="Favorites"
              component={Favorites}
              options={{
                title: 'Favorites',
                tabBarLabel: 'Favorites',
                tabBarIcon: ({color, size}) => (
                  <FavIcon name="favorite" color={color} size={size} />
                ),

              }}
            />
            <Tab.Screen
              name="Orders"
              component={Orders}
              options={{
                title: 'Orders',
                tabBarLabel: 'Orders',
                tabBarIcon: ({color, size}) => (
                  <Icon name="truck" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Logout"
              component={Logout}
              options={{
                title: 'Logout',
                tabBarLabel: 'Logout',
                tabBarIcon: ({color, size}) => (
                  <Icon name="sign-out" color={color} size={size} />
                ),
              }}
            />
          </>
        ) : (
          <Tab.Screen
            name="Login"
            component={AuthPage}
            options={{
              title: 'Login',
              tabBarLabel: 'Login',
              tabBarIcon: ({color, size}) => (
                <Icon name="sign-in" color={color} size={size} />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
