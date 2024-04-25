import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const EditProfile = ({ userData, updateUserData }) => {
  const [name, setName] = useState(userData.name);
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [email, setEmail] = useState(userData.email);
  const [username, setUsername] = useState(userData.username);

  const handleSubmit = () => {
    const updatedUserData = {
      name,
      dateOfBirth,
      email,
      username
    };
    updateUserData(updatedUserData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
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
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#636970',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    paddingVertical: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EditProfile;
