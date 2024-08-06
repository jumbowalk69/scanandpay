import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import HeroImg from '../assets/hero.png'; 

export default function Landing() {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_a}>
        <Image source={HeroImg} style={styles.image1} />
      </View>
      <View style={styles.container_b}>
        {/* <View style={styles.sub_container_b}> */}
          {/* <View style={styles.circleContainer}>
            <Image source={Scan} style={styles.image2} />
          </View> */}
          <Text style={styles.text1}>
            <Text style={{ fontWeight: '700' }}>Scan</Text>Pay
          </Text>
        {/* </View>
        <View> */}
          <Text style={styles.desc}> 
            Introducing ScanPay: Your all-in-one shopping companion. Scan any product barcode in-store, seamlessly pay, and walk out hassle-free.
          </Text>
        {/* </View> */}
      </View>
      <View style={styles.container_c}>
        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText1}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  container_a: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container_b: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  container_c: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // sub_container_b: {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  // },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey'
  },
  image1: {
    width: '100%', 
    height: 400, 
    resizeMode: 'cover', 
    borderRadius: 10, 
    marginTop: 40, 
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'lightblue', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    width: 60, 
    height: 60, 
    resizeMode: 'contain', 
  },
  text1: {
    fontSize: 40,
    marginBottom: 6,
  },
  button1: {
    width: '80%',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  button2: {
    width: '80%',
    height: 55,
    borderColor: '#000000', 
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText2: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },    
});
