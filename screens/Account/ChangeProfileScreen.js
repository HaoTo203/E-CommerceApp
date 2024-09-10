import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { Colors } from "../../constants/styles";
import { Dropdown } from "react-native-element-dropdown";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getFormattedDate } from "../../util/date";
import { AuthContext } from "../../store/auth-context";
import { updateUserProfile } from "../../util/http";
import { genderData } from "../../constants/data";
import { changePassword, login } from "../../util/auth";
import { UserDataContext } from "../../store/user-data-context";

function ChangeProfileScreen({ route, navigation }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [enteredNewPassword, setEnteredNewPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);

  const formType = route.params.type;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: formType,
    });
  }, [navigation]);

  useEffect(() => {
    // Show the exist data
    if (formType !== "Change Password") {
      setEnteredFirstName(userDataContext.profile.name.firstName);
      setEnteredLastName(userDataContext.profile.name.lastName);
      setSelectedDate(
        new Date(
          !!userDataContext.profile.birthday && userDataContext.profile.birthday
        )
      );
      setEnteredPhoneNumber(userDataContext.profile.phoneNumber);
    }
  }, []);

  function submitHandler() {
    const userProfile = userDataContext.profile;
    if (formType !== "Change Password") {
      userProfile.name = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
      };
      userProfile.birthday = selectedDate;
      userProfile.phoneNumber = enteredPhoneNumber;
      if (!!selectedGender) {
        userProfile.gender = selectedGender.label;
      }

      // Update data that don't need to check token
      const uploadData = async () => {
        try {
          await updateUserProfile(
            authContext.token,
            authContext.uid,
            userProfile
          );
          userDataContext.changeProfile({ ...userProfile });

          navigation.goBack();
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadData();
      return;
    }

    // Check credentials
    const newPasswordIsValid = enteredNewPassword.length >= 6;
    const confirmPasswordIsValid =
      enteredConfirmPassword === enteredNewPassword;

    setCredentialsInvalid({
      newPassword: !newPasswordIsValid,
      confirmPassword: !confirmPasswordIsValid,
    });

    if (!newPasswordIsValid || !confirmPasswordIsValid) {
      return;
    }

    /*
      To update the password user need to re authenticate if the app using other database type.
      Here we using firebase provide user change password in about 60 minutes after authenticate.
    */

    const response = async () => {
      try {
        const key = await changePassword(authContext.token, enteredNewPassword);
        authContext.authenticate(key);
        navigation.goBack();
      } catch (error) {
        console.log(error.message);
        Alert.alert(
          "Change Password Failed!",
          "Please, sign in again to change password!"
        );
      }
    };

    response();
  }

  return (
    <View style={styles.container}>
      {/* Name Form */}
      {formType == "Name" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>First Name</Text>
            <Input
              inputOptions={{
                value: enteredFirstName,
                onChangeText: (enteredText) => {
                  setEnteredFirstName(enteredText);
                },
              }}
              style={styles.inputContainer}
              onPress={() => {}}
            />
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>Last Name</Text>
            <Input
              inputOptions={{
                value: enteredLastName,
                onChangeText: (enteredText) => {
                  setEnteredLastName(enteredText);
                },
              }}
              style={styles.inputContainer}
              onPress={() => {}}
            />
          </View>
        </>
      )}

      {/* Gender Form */}
      {formType == "Gender" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>Choose Gender</Text>
            <Dropdown
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              data={genderData}
              labelField="label"
              valueField="value"
              value={selectedGender}
              onChange={(item) => {
                setSelectedGender(item);
              }}
              placeholder="Choose"
              placeholderStyle={styles.selectedTextStyle}
            />
          </View>
        </>
      )}

      {/* Birthday Form */}
      {formType == "Birthday" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>Birthday</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {
                DateTimePickerAndroid.open({
                  mode: "date",
                  value: new Date(),
                  onChange: (event, selectedDate) => {
                    if (event.type == "set") {
                      setSelectedDate(selectedDate);
                    }
                  },
                });
              }}
              inputOptions={{
                editable: false,
                value: getFormattedDate(selectedDate),
              }}
              rightIcon={
                <Ionicons
                  style={{ marginHorizontal: 8 }}
                  name="calendar-clear-outline"
                  size={24}
                  color={Colors.Neutral_Grey}
                />
              }
            />
          </View>
        </>
      )}

      {/* Email Form */}
      {formType == "Email" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>Your Email</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              leftIcon="mail-outline"
              inputOptions={{
                editable: false,
                value: userDataContext.profile.email,
              }}
            />
          </View>
        </>
      )}

      {/* Phone Number Form */}
      {formType == "Phone Number" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>Phone Number</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              leftIcon="phone-portrait-outline"
              inputOptions={{
                value: enteredPhoneNumber,
                onChangeText: (enteredText) => {
                  setEnteredPhoneNumber(enteredText);
                },
              }}
            />
          </View>
        </>
      )}

      {/* Password Form */}
      {formType == "Change Password" && (
        <>
          <View style={styles.partContainer}>
            <Text style={styles.title}>New Password</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              leftIcon="lock-closed-outline"
              isError={credentialsInvalid.newPassword}
              errorText="Password must be at least 6 characters!"
              inputOptions={{
                returnKeyType: "done",
                secureTextEntry: true,
                value: enteredNewPassword,
                onChangeText: (enteredText) => {
                  setEnteredNewPassword(enteredText);
                },
              }}
            />
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>New Password Again</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              leftIcon="lock-closed-outline"
              isError={credentialsInvalid.confirmPassword}
              errorText="Password is not equal!"
              inputOptions={{
                returnKeyType: "done",
                secureTextEntry: true,
                value: enteredConfirmPassword,
                onChangeText: (enteredText) => {
                  setEnteredConfirmPassword(enteredText);
                },
              }}
            />
          </View>
        </>
      )}

      {formType != "Email" && (
        <PrimaryButton onPress={submitHandler}>Save</PrimaryButton>
      )}
    </View>
  );
}

export default ChangeProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  partContainer: {
    marginVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },

  dropdown: {
    borderColor: Colors.Neutral_Grey,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 6,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },
  itemContainerStyle: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },
});
