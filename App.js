import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from './screens/Landing';
import Login from './screens/Login';
import Home from './screens/Home';
import Checkout from './screens/Checkout';
import Bill from './screens/Bill';
import Register from './screens/Register';
import AuthContext, { AuthProvider } from './hooks/AuthContext'; // Import AuthProvider and AuthContext
import AppNavigator from './AppNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }}/>
      <Stack.Screen name="Bill" component={Bill} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <AuthContext.Consumer>
            {({ isLoggedIn }) => (
              isLoggedIn ? (
                <AppNavigator />
                // <Tab.Navigator>
                //   <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                //   <Tab.Screen name="Bill" component={Bill} options={{ headerShown: false }}/>
                //   <Tab.Screen name="Checkout" component={Checkout} options={{ headerShown: false }}/>
                // </Tab.Navigator>
              ) : (
                <AppStack />
              )
            )}
          </AuthContext.Consumer>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
