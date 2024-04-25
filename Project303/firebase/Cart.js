import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./Config";

const collectionReference = collection(db, "Cart");

const getUserCart = async (uuid) => {
  const q = query(collectionReference, where("uuid", "==", uuid));
  try {
    const promise = await getDocs(q);
    const cart = [];
    promise.docs.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id });
    });
    return cart;
  } catch (err) {
    console.log("getUserCart: ", err.message);
  }
};
const addToCart = async (data) => {
  await addDoc(collectionReference, data);
};
const deleteProductCart = async (id) => {
  const docReference = doc(db, "Cart", id);
  try {
    await deleteDoc(docReference);
  } catch (err) {
    console.log("deleteTodo: ", err.message);
  }
};

export { getUserCart, deleteProductCart, addToCart };
