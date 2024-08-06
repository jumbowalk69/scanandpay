import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../hooks/AuthContext'; // Import AuthContext

import Scan from '../assets/scan.png';
import FB from '../assets/fb.png';
import Google from '../assets/google.png';
import Apple from '../assets/apple.png';

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext); // Access login method from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send POST request with email and password in the body
      const response = await axios.post('http://10.0.2.2:8080/api/auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Extract token from response
        const { token } = response.data;
        
        // Store token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
        console.log(token);
        // Update context or navigate to the Home screen
        login(); // Assuming login sets some state in AuthContext
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sub_container}>
        <View style={styles.circleContainer}>
          <Image source={Scan} style={styles.image} />
        </View>
        <Text style={styles.text1}>
          <Text style={{ fontWeight: '700' }}>Scan</Text>Pay
        </Text>
      </View>
      <View style={styles.pt1}>
        <Text style={styles.heading}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address" // Optional for better UX
        />
      </View>
      <View style={styles.pt2}>
        <Text style={styles.heading}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter password" 
          secureTextEntry={true} 
          value={password} 
          onChangeText={setPassword}
        />
      </View>
      <View style={{ display: 'flex', marginBottom: 8 }}>
        <Text style={{ textAlign: 'right', color: 'grey', fontWeight: '600' }}>Forgot Password?</Text>
      </View>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: 'grey', fontWeight: '600' }}>Or Login with</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={FB} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={Google} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={Apple} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <Text>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('Register')} style={{ color: '#0265ff' }}>Register</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    padding: 10,
  },
  pt1: {
    marginBottom: 5,
  },
  pt2: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 55,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 12,
    fontWeight: '500',
    fontSize: 14,
  },
  button1: {
    width: '100%',
    height: 55,
    backgroundColor: '#0265ff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText1: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  sub_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  text1: {
    fontSize: 30,
  },
  icon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
