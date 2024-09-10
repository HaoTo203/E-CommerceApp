/*
  This app using firebase authentication to authenticate user
  The code belove using axios and authentication REST api to connect to database, 
  not using SDKs.
*/

import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const key = {
    token: response.data.idToken,
    uid: response.data.localId,
  };
  return key;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function changePassword(idToken, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.EXPO_PUBLIC_API_KEY}`;
  const response = await axios.post(url, {
    idToken: idToken,
    password: password,
    returnSecureToken: true,
  });

  const key = {
    token: response.data.idToken,
    uid: response.data.localId,
  };
  return key;
}

export async function sendVerificationLink(email) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.EXPO_PUBLIC_API_KEY}`;
  try {
    const response = await axios.post(url, {
      email: email,
      requestType: "PASSWORD_RESET",
    });

    return true;
  } catch (error) {
    return false;
  }
}
