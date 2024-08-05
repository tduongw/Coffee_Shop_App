import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 

        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Hiệu ứng từ dưới lên
          headerShown: false
        }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}/>

        <Stack.Screen
          name="Details"
          component={DetailsScreen}/>
        
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}/>

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
