import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { collection} from "firebase/firestore";
import { router } from "expo-router";
import { auth , db} from "./Config";
import { CreateUser } from './users';
//register
const signUpHandler = async (email, firstName, lastName, password, error) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      uuid: cred.user.uid,
    };
    CreateUser(data);
    console.log(cred.user.email);
    router.replace("/home/app");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":"));
    error(message.substring(2));
    console.log(err.message);
  }
};

const signInHandler = async (email, password, error) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log(cred.user.email);
    router.replace("/home/app");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":"));
    error(message.substring(2));
    console.log(err.message);
  }
};

const signOutHandler = async () => {
  await signOut(auth);
  router.replace("/account/login");
};

const resetPasswordHandler = async (email, error , status) => {
  try {
    await sendPasswordResetEmail(auth, email);
    status("The reset password email has been sent. check your email inbox!");
    error("");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":"));
    error(message.substring(2));
    status("");
    console.log(err.message);
  }
};
//updates
const updateUserEmail = async (user,email, error) => {
  try {
    await updateEmail(user,email);
    error("");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":"));
    error(message.substring(2));
    console.log(err.message);
  }
};
const updateUserPassword = async (user,password, error) => {
  try {
    await updatePassword(user, password);
    error("");
  } catch (err) {
    const message = err.message.substring(err.message.indexOf(":"));
    error(message.substring(2));
    console.log(err.message);
  }
};

export {
  signUpHandler,
  signInHandler,
  signOutHandler,
  updateUserEmail,
  resetPasswordHandler,
  updateUserPassword,
};
