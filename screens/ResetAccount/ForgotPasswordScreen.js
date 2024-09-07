import { Image, StyleSheet, Text, View } from "react-native";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { sendVerificationLink } from "../../util/auth";

function ForgotPasswordScreen({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Find your account</Text>
      <Text style={styles.subText}>Enter your email</Text>

      {/* Input Email */}
      <Input
        style={styles.inputContainer}
        placeHolder="Your Email"
        leftIcon="mail"
        isError={emailInvalid}
        errorText="Incorrect Email!"
        inputOptions={{
          returnKeyType: "done",
          value: enteredEmail,
          onChangeText: (enteredValue) => {
            setEnteredEmail(enteredValue);
          },
        }}
      />

      {/* Next Button */}
      <PrimaryButton
        onPress={() => {
          const emailIsValid = enteredEmail.includes("@");
          setEmailInvalid(!emailIsValid);
          if (!emailIsValid) return;

          if (sendVerificationLink(enteredEmail)) {
            navigation.navigate("VerificationScreen", { email: enteredEmail });
          }
        }}
        style={{ margin: 16 }}
      >
        Next
      </PrimaryButton>
    </View>
  );
}

export default ForgotPasswordScreen;

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

  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
});
