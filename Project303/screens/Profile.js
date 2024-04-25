import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

const Dashboard = () => {
  
  const [userData, setUserData] = useState({
    name: "Mohamed Ragab",
    dateOfBirth: "2/02/2000",
    email: "mohamedragab@gmail.com",
    username: "mohamedragab",
    password:"1234567"
  });

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <Text style={styles.label}>Name: <Text style={styles.text}>{userData.name}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.text}>{userData.email}</Text></Text>
        <Text style={styles.label}>Date of Birth: <Text style={styles.text}>{userData.dateOfBirth}</Text></Text>
        <Text style={styles.label}>User Name: <Text style={styles.text}>{userData.username}</Text></Text>
        <Link href="/account/editProfile" style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Link>          
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  buttonBox: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    borderRadius:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#636970',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 20,
  },
});

export default Dashboard;
