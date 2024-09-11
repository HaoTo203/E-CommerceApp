import { Image, Linking, StyleSheet, Text, View } from "react-native";
import Input from "../../components/ui/Input";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../../components/ui/PrimaryButton";
import TextButton from "../../components/ui/TextButton";
import { sendVerificationLink } from "../../util/auth";

function VerificationScreen({ route, navigation }) {
  const email = route.params.email;
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/Icon.png")} />

      {/* Title */}
      <Text style={styles.primaryText}>Verified your email address</Text>
      <Text style={styles.subText}>A verification email has been sent to</Text>
      <Text style={styles.email}>{email}</Text>

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
            sendVerificationLink(email);
          }}
        >
          Resend Code
        </TextButton>
      </View>

      {/* Next Button */}
      <PrimaryButton
        onPress={() => {
          navigation.navigate("LoginScreen");
        }}
        style={{ marginHorizontal: 16 }}
      >
        Sign In
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
