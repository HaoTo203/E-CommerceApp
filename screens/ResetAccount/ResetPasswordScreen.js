import { Image, StyleSheet, Text, View } from "react-native";
import Input from "../../components/ui/Input";
import { useRef, useState } from "react";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../../components/ui/PrimaryButton";
import TextButton from "../../components/ui/TextButton";

function ResetPasswordScreen({ route, navigation }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRePassword, setEnteredRePassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    password: false,
    rePassword: false,
  });
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const email = route.params.email;
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Reset password</Text>
      <Text style={styles.subText}>Enter your new password</Text>

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

      {/* Next Button */}
      <PrimaryButton
        onPress={() => {
          const passwordIsValid = enteredPassword.length >= 6;
          const rePasswordIsValid = enteredPassword === enteredRePassword;

          setCredentialsInvalid({
            password: !passwordIsValid,
            rePassword: !rePasswordIsValid,
          });

          if (!passwordIsValid || !rePasswordIsValid) {
            return;
          }

          //TODO: change password
          navigation.navigate("LoginScreen");
        }}
        style={{ marginHorizontal: 16 }}
      >
        Change Password
      </PrimaryButton>
    </View>
  );
}

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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

  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },

  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
