import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SplashScreen from '../components/screens/SplashScreen';
import WelcomeScreen from '../components/screens/WelcomeScreen';
import SignupScreen from '../components/screens/SignupScreen';
import HomeScreen from '../components/screens/home/HomeScreen';
import EmailScreen from '../components/screens/EmailScreen';
import FavoriteScreen from '../components/screens/FavoriteScreen';
import VoucherScreen from '../components/screens/VoucherScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import NomeScreen from '../components/screens/NomeScreen';
import ChatbotScreen from '../components/screens/ChatbotScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import LoginScreen from '../components/screens/LoginScreen'
import CartScreen from '../components/screens/CartScreen'


const Stack = createStackNavigator();

// Função personalizada para animação de transição
const forVerticalSlide = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
  };
};

// Função personalizada para remover animações de transição
const noTransition = () => {
  return {
    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
  };
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} options={noTransition} />

        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} options={noTransition} />
        <Stack.Screen name="Voucher" component={VoucherScreen} options={noTransition} />
        <Stack.Screen name="NomeScreen" component={NomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={noTransition}/>
        <Stack.Screen
          name="Cart" 
          component={CartScreen} 
          options={{
            cardStyleInterpolator: forVerticalSlide, 
          }}
        />
        <Stack.Screen
          name="Chatbot" 
          component={ChatbotScreen} 
          options={{
            cardStyleInterpolator: forVerticalSlide, 
          }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default AppNavigation;
