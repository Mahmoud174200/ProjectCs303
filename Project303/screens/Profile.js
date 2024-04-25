import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import EditProfile from './editProfile'; 

const Dashboard = () => {
  
  const [userData, setUserData] = useState({
    name: "Mohamed Ragab",
    dateOfBirth: "2/02/2000",
    email: "mohamedragab@gmail.com",
    username: "mohamedragab"
  });

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <EditProfile userData={userData} updateUserData={updateUserData} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Dashboard;
