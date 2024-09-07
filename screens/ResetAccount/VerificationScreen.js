import { Image, Linking, StyleSheet, Text, View } from "react-native";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../../components/ui/PrimaryButton";
import TextButton from "../../components/ui/TextButton";

function VerificationScreen({ route, navigation }) {
  const [enteredCode, setEnteredCode] = useState("");
  const [codeInvalid, setCodeInvalid] = useState(false);
  const email = route.params.email;
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Verified your email address</Text>
      <Text style={styles.subText}>A verification code has been sent to</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Input Verification Code */}
      <Input
        style={styles.inputContainer}
        placeHolder="Verification Code"
        leftIcon="code-slash"
        isError={codeInvalid}
        errorText="Incorrect Code"
        inputOptions={{
          returnKeyType: "done",
          value: enteredCode,
          onChangeText: (enteredValue) => {
            setEnteredCode(enteredValue);
          },
        }}
      />

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 32,
          marginVertical: 8,
        }}
      >
        <TextButton
          style={{ flex: 1, alignItems: "flex-end" }}
          onPress={() => {
            //TODO: Resend verification code
          }}
        >
          Resend Code
        </TextButton>
      </View>

      {/* Next Button */}
      <PrimaryButton
        onPress={() => {
          //TODO: check if code is correct

          navigation.navigate("ResetPasswordScreen", { email: email });
        }}
        style={{ marginHorizontal: 16 }}
      >
        Next
      </PrimaryButton>
    </View>
  );
}

export default VerificationScreen;

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
  },

  email: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginBottom: 24,
  },

  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
