import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, Platform, StatusBar, Image } from 'react-native'; // Import Image from react-native
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';

import Scan from '../assets/scan.png';

export default function Home({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);
  const [scannerKey, setScannerKey] = useState(0); // Key to force re-render
  const [isScanning, setIsScanning] = useState(false); 
  const [scannedItemCount, setScannedItemCount] = useState(0);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const refreshScannedData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('scannedData');
          if (jsonValue != null) {
            const data = JSON.parse(jsonValue);
            setScannedData(data);
            setScannedItemCount(data.length); // Initialize scanned item count
          }
        } catch (e) {
          console.error('Failed to load scanned data.', e);
        }
      };

      refreshScannedData();
      setScanned(false); 
      setScannerKey(prevKey => prevKey + 1);

      return () => {
        setIsScanning(false);
      };
    }, [])
  );

  const saveScannedData = async (data) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('http://10.0.2.2:8080/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `${token}`,
        },
        body: JSON.stringify({ rfid: data.data }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${errorText}`);
      }
  
      const responseData = await response.json();
      // console.log('Backend response:', responseData);
      return responseData;
    } catch (error) {
      console.error('Failed to save scanned data.', error);
      throw error;
    }
  };
  
    
  // Function to handle the barcode scan event
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
  
    // Create new scanned data object
    const newScannedData = { type, data };
  
    // Update scanned data array
    const updatedScannedData = [...scannedData, newScannedData];
    setScannedData(updatedScannedData);
    setScannedItemCount(prevCount => prevCount + 1);
  
    try {
      // Save scanned data to backend
      await saveScannedData({ type, data });
  
      // Alert the user that the barcode has been scanned successfully
      Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    } catch (error) {
      // Handle error scenarios and show an alert to the user
      Alert.alert('Failed to send data to backend. Please try again later.');
    }
  };
  
  const toggleScanning = () => {
    setIsScanning(prev => !prev);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Checkout')}>
        <Ionicons name="cart-outline" size={30} color="#000000" />
        {scannedItemCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{scannedItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Scan the Codes</Text>
      </View>
      {!isScanning ? (
        <View style={styles.placeholder}>
          <Image
            source={Scan} 
            style={styles.placeholderImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.scanner}>
          <BarCodeScanner
            key={scannerKey} // Use key to force re-render
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      <View style={styles.btns}>
        {!isScanning && (
          <TouchableOpacity style={styles.button1} onPress={toggleScanning}>
            <Text style={{ color: '#ffffff' }}>Start Scanning</Text>
          </TouchableOpacity>
        )}
        {scanned && (
          <TouchableOpacity style={styles.button1} onPress={() => setScanned(false)}>
            <Text style={{ color: '#ffffff' }}>Scan Another Product</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={{ color: '#000000' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cartIcon: {
    flex: 1, 
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cartCount: {
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scanner: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 180,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btns: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
  checkoutButton: {
    width: '80%',
    height: 55,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
