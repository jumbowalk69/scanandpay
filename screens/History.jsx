import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform, StatusBar } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
  { id: '6', title: 'Item 6' },
  { id: '7', title: 'Item 7' },
  { id: '8', title: 'Item 8' },
  { id: '9', title: 'Item 9' },
  { id: '10', title: 'Item 10' },
  { id: '11', title: 'Item 11' },
  { id: '12', title: 'Item 12' },
  { id: '13', title: 'Item 13' },
  { id: '14', title: 'Item 14' },
  // Add more items if needed
];

const History = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flex: 1, backgroundColor: "#aaa"}}>
        <Text>{item.id}</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "#ccc"}}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>
          History 
        </Text>
        <FontAwesome name="history" size={24} color="black" />
      </View>
      <View style={styles.body}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={true}  // Show vertical scroll indicator
          contentContainerStyle={styles.flatList}
        />
      </View>
      <View style={{ flex: 0.5 }}> 

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    flex: 3
  },
  flatList: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default History;
