import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Scan from '../assets/scan.png';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (responseMessage) {
      console.log(responseMessage);
    }
  }, [responseMessage]);

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setResponseMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage('User registered successfully');
        navigation.navigate('Home'); // Navigate to Home on successful registration
      } else {
        setResponseMessage(data.message || 'User registration failed');
      }
    } catch (error) {
      setResponseMessage('An error occurred: ' + error.message);
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
      <View style={styles.sub_container}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Create an Account</Text>
      </View>
      <View style={styles.pt1}>
        <Text style={styles.heading}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.pt1}>
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.pt1}>
        <Text style={styles.heading}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.pt2}>
        <Text style={styles.heading}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={styles.button1} onPress={registerUser}>
          <Text style={styles.buttonText1}>Register</Text>
        </TouchableOpacity>
      </View>
      {responseMessage ? (
        <View style={styles.responseMessageContainer}>
          <Text style={styles.responseMessage}>{responseMessage}</Text>
        </View>
      ) : null}
      <View style={styles.bottomSection}>
        <Text>
          Already have an account?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={{ color: '#0265ff' }}>Login</Text>
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
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseMessageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  responseMessage: {
    color: 'red',
    textAlign: 'center',
  },
});
