import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import {
  CreateUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../firebase/users";
import { loadDataFromStorage,saveDataToStorage} from "../components/AsyncStorageFun";
const UsersScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dataUser, setDatausers] = useState([]);
  const fetchData = async () => {
    try {
      const UserFromServer = await getAllUsers(); // Fetch todos asynchronously from server
      setDatausers(UserFromServer);
      saveDataToStorage("users", UserFromServer); // Save todos to AsyncStorage
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  const addHandler = async () => {
    try {
      const trimmedTitle = title.trim(); // Remove leading and trailing spaces
      if (trimmedTitle === "") {
        console.error("data cannot be empty.");
        return;
      }
      if (trimmedTitle.includes(" ")) {
        console.error("Todo title cannot contain spaces.");
        return;
      }
      const newTodo = { title: trimmedTitle, uuid: uid }; // Create new todo object with trimmed title
      CreateTodo(newTodo); // Add new todo to Firestore
      const updatedTodos = [...data, newTodo]; // Update state with new todos
      setData(updatedTodos); // Update state with new todos
      await saveDataToStorage("todos", updatedTodos); // Save updated todos to AsyncStorage
      setTitle(""); // Clear input after adding todo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  useEffect(() => {
    fetchData();
    loadDataFromStorage("users");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            const data = {
              email: email,
              firstName: firstName,
              lastName: lastName,
              isadmin: false,
            };
            CreateUser(data);
          }}
        >
          <Text style={styles.buttonText}>Add User</Text>
        </Pressable>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={dataUser}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>{item.firstName}</Text>
              <Text>{item.lastName}</Text>
              <Pressable
                onPress={() => {
                  setSelectedUser(item);
                  setEditModalVisible(true);
                }}
              >
                <Text style={styles.editButton}>Edit</Text>
              </Pressable>
              <Pressable onPress={() =>deleteUser(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
      <Modal
        visible={editModalVisible}
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              value={selectedUser?.name}
              onChangeText={(text) =>
                setSelectedUser({ ...selectedUser, name: text })
              }
            />
            {/* <Pressable style={styles.button} onPress={updateUser}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#264143",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContainer: {
    flex: 1,
    width: "80%",
    marginTop: 20,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  editButton: {
    color: "blue",
  },
  deleteButton: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
});

export default UsersScreen;
