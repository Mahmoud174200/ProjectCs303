import { auth, db } from "./Config";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
const collectionReference = collection(db, "users");
let Userid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    Userid = user.uid;
    console.log(user);
  }
});
const CreateUser = async (data) => {
  try {
    const newUser = await addDoc(collectionReference, data);
    console.log("Suceess to add user" + newUser);
  } catch (err) {
    console.log("fail to add" + err.message);
  }
  console.log(data);
};
const updateUser = async (data, uuid) => {
  try {
    const user = await getUser(uuid);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    const documentReference = doc(db, "users", user.id);
    await updateDoc(documentReference, data);
    console.log("user updated successfully!");
    return user;
  } catch (err) {
    console.log("updateUser: ", err.message);
  }
};
const getUser = async (uuid) => {
  const q = query(collectionReference, where("uuid", "==", uuid));
  try {
    const promise = await getDocs(q);
    return { ...promise.docs[0].data(), id: promise.docs[0].id };
  } catch (err) {
    console.log("getUser: ", err.message);
  }
};
const getAllUsers = async () => {
  try {
    const promise = await getDocs(collectionReference);
    const users = [];
    promise.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    return users;
  } catch (err) {
    console.log("getAllUsers: ", err.message);
  }
};

const deleteUser = async (id) => {
  const docReference = doc(db, "users", id);
  try {
    await deleteDoc(docReference);
  } catch (err) {
    console.log("deleteUser: ", err.message);
  }
};

const getCurrentUserUuid = () => {
  return Userid;
};
export { updateUser, CreateUser, getCurrentUserUuid ,deleteUser, getAllUsers  };
