import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}/>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ borderWidth: 1, borderRadius: 20, padding: 15 }}>
            <AntDesign name="user" size={100} color="black" />
          </View>
          <View>
            <View style={styles.name}>
              <Text style={styles.name_txt}>Shantanu Dasila</Text>
            </View>
            <View style={styles.email}>
              <Text style={styles.email_txt}>itsshanu11@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}/>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText1}>Modify Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>  
          <Text style={styles.buttonText2}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    padding: 20,
  },
  name_txt: {
    fontSize: 20,
    textAlign: 'center'
  },
  email: {
    padding: 20,
    paddingTop: 10,
  },
  email_txt: {
    fontSize: 16,
    textAlign: 'center'
  },
  button1: {
    width: '60%',
    height: 40,
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
    fontWeight: '400',
  },
  button2: {
    width: '60%',
    height: 40,
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
    fontWeight: '400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
