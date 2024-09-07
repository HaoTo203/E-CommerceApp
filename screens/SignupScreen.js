import { Image, StyleSheet, View, Text, Alert } from "react-native";
import { Colors } from "../constants/styles";
import Input from "../components/ui/Input";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextButton from "../components/ui/TextButton";
import { useContext, useRef, useState } from "react";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { updateUserProfile } from "../util/http";

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRePassword, setEnteredRePassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    rePassword: false,
  });

  const authContext = useContext(AuthContext);

  const mailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  function switchModeHandler() {
    navigation.navigate("LoginScreen");
  }

  async function signupHandler() {
    // Check credentials
    const nameIsValid = enteredName.length != 0;
    const emailIsValid = enteredEmail.includes("@");
    const passwordIsValid = enteredPassword.length >= 6;
    const rePasswordIsValid = enteredPassword === enteredRePassword;

    setCredentialsInvalid({
      name: !nameIsValid,
      email: !emailIsValid,
      password: !passwordIsValid,
      rePassword: !rePasswordIsValid,
    });

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !rePasswordIsValid
    ) {
      return;
    }

    // Call API to authenticate
    setIsAuthenticating(true);
    try {
      const key = await createUser(enteredEmail, enteredPassword);
      authContext.authenticate(key);
      const profile = {
        name: {
          firstName: enteredName,
          lastName: "",
        },
        email: enteredEmail,
        gender: null,
        birthday: null,
        imageUri: null,
        phoneNumber: null,
      };
      await updateUserProfile(key.token, key.uid, profile);
    } catch (error) {
      Alert.alert("SignUp Failed!", "Please, Try again!");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Let's get started</Text>
      <Text style={styles.subText}>Create a new account</Text>

      {/* Input Name */}
      <Input
        style={styles.inputContainer}
        placeHolder="Full Name"
        leftIcon="person"
        isError={credentialsInvalid.name}
        errorText="Empty Name!"
        inputOptions={{
          returnKeyType: "next",
          onSubmitEditing: () => mailRef.current.focus(),
          value: enteredName,
          onChangeText: (enteredValue) => {
            setEnteredName(enteredValue);
          },
        }}
      />

      {/* Input Email */}
      <Input
        style={styles.inputContainer}
        placeHolder="Your Email"
        leftIcon="mail"
        isError={credentialsInvalid.email}
        errorText="Incorrect Email!"
        inputOptions={{
          returnKeyType: "next",
          ref: mailRef,
          onSubmitEditing: () => passwordRef.current.focus(),
          value: enteredEmail,
          onChangeText: (enteredValue) => {
            setEnteredEmail(enteredValue);
          },
        }}
      />

      {/* Input Password */}
      <Input
        style={styles.inputContainer}
        placeHolder="Password"
        leftIcon="lock-closed"
        isError={credentialsInvalid.password}
        errorText="Password must be at least 6 characters!"
        inputOptions={{
          returnKeyType: "next",
          ref: passwordRef,
          onSubmitEditing: () => rePasswordRef.current.focus(),
          secureTextEntry: true,
          value: enteredPassword,
          onChangeText: (enteredValue) => {
            setEnteredPassword(enteredValue);
          },
        }}
      />

      {/* Input Confirm Password */}
      <Input
        style={styles.inputContainer}
        placeHolder="Confirm Password"
        leftIcon="lock-closed"
        isError={credentialsInvalid.rePassword}
        errorText="Password is not equal!"
        inputOptions={{
          returnKeyType: "done",
          ref: rePasswordRef,
          secureTextEntry: true,
          value: enteredRePassword,
          onChangeText: (enteredValue) => {
            setEnteredRePassword(enteredValue);
          },
        }}
      />

      {/* Sign Up Button */}
      <PrimaryButton onPress={signupHandler} style={styles.buttonContainer}>
        Sign Up
      </PrimaryButton>

      {/* Switch Mode Button */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Already have an account? </Text>
        <TextButton onPress={switchModeHandler}>Sign In</TextButton>
      </View>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: Colors.Neutral_Dark,
  },

  subText: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginBottom: 24,
  },

  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },

  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  registerText: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
