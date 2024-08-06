import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://10.0.2.2:8080/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, // Use Bearer token for authorization
          },
        });

        if (!response.ok) {
          const errorBody = await response.text(); // Read the response body
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}. Details: ${errorBody}`);
        }

        const result = await response.json();
        console.log('Fetched data:', result); // Log the data for inspection

        // Validate data and ensure each item has a unique id
        const validatedData = result.map((item, index) => ({
          ...item,
          id: item.id || `item-${index}` // Use index as a fallback key
        }));
        console.log('Validated data:', validatedData); // Log the validated data
        setData(validatedData); // Update state with validated data
      } catch (error) {
        console.error('Error fetching data:', error); // Log detailed error
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  // If loading, show spinner
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If error, show error message
  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  // Render FlatList with fetched data
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} // Use id which is now guaranteed to be unique
      renderItem={renderItem} // Function to render each item
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  listContainer: {
    padding: 20,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Checkout;
