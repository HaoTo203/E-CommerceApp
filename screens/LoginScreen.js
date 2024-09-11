import { View, Text, Image, StyleSheet, Keyboard, Alert } from "react-native";
import Input from "../components/ui/Input";
import { Colors } from "../constants/styles";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextSeparator from "../components/ui/TextSeparator";
import IconButton from "../components/ui/IconButton";
import TextButton from "../components/ui/TextButton";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const authContext = useContext(AuthContext);

  const passwordRef = useRef();
  function switchModeHandler() {
    navigation.navigate("SignupScreen");
  }

  async function signinHandler() {
    // Check credentials
    const emailIsValid = enteredEmail.includes("@");
    const passwordIsValid = enteredPassword.length >= 6;

    setCredentialsInvalid({
      email: !emailIsValid,
      password: !passwordIsValid,
    });

    if (!emailIsValid || !passwordIsValid) {
      Alert.alert("Wrong!", "Please, Try again!");
      return;
    }

    // Call API to authenticate
    setIsAuthenticating(true);
    try {
      const key = await login(enteredEmail, enteredPassword);
      authContext.authenticate(key);
    } catch (error) {
      Alert.alert("SignUp Failed!", "Please, Try again!");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Welcome to Lafyuu</Text>
      <Text style={styles.subText}>Sign in to continue</Text>

      {/* Input Email */}
      <Input
        onPress={() => {}}
        style={styles.inputContainer}
        placeHolder="Your Email"
        leftIcon="mail"
        isError={credentialsInvalid.email}
        errorText="Incorrect Email!"
        inputOptions={{
          returnKeyType: "next",
          onSubmitEditing: () => passwordRef.current.focus(),
          value: enteredEmail,
          onChangeText: (enteredValue) => {
            setEnteredEmail(enteredValue);
          },
        }}
      />

      {/* Input Password */}
      <Input
        onPress={() => {}}
        style={styles.inputContainer}
        placeHolder="Password"
        leftIcon="lock-closed"
        isError={credentialsInvalid.password}
        errorText="Wrong password!"
        inputOptions={{
          returnKeyType: "done",
          ref: passwordRef,
          secureTextEntry: true,
          value: enteredPassword,
          onChangeText: (enteredValue) => {
            setEnteredPassword(enteredValue);
          },
        }}
      />

      {/* Login Button */}
      <PrimaryButton onPress={signinHandler} style={styles.buttonContainer}>
        Sign In
      </PrimaryButton>

      {/* Separator */}
      <TextSeparator style={styles.textSeparatorContainer}>OR</TextSeparator>

      {/* Or the sign in method */}
      {true && (
        <>
          {/* Using firebase SDKs so not implement yet! */}
          <IconButton
            icon={<Image source={require("../assets/images/Google.png")} />}
            style={styles.iconButtonContainer}
          >
            Login with Google
          </IconButton>
          <IconButton
            icon={<Image source={require("../assets/images/Facebook.png")} />}
            style={styles.iconButtonContainer}
          >
            Login with Facebook
          </IconButton>
          <TextButton
            onPress={() => {
              navigation.navigate("ForgotPasswordScreen");
            }}
            style={styles.registerButton}
          >
            Forgot Password?
          </TextButton>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TextButton onPress={switchModeHandler}>Register</TextButton>
          </View>
        </>
      )}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },

  buttonContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },

  textSeparatorContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },

  iconButtonContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
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

  registerText: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  registerButton: {
    marginVertical: 10,
  },
});
