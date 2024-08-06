import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Bill() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Bill Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
