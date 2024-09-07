import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import PrimaryButton from "../../components/ui/PrimaryButton";
import IconButton from "../../components/ui/IconButton";
import { communeData, districtData, provinceData } from "../../constants/data";
import { AuthContext } from "../../store/auth-context";
import {
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
} from "../../util/http";

function AddressFormScreen({ route, navigation }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    phoneNumber: false,
    address: false,
    province: false,
    district: false,
    commune: false,
  });
  const authContext = useContext(AuthContext);
  const address = route.params?.address;
  const formType = route.params.type;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: formType + " Address",
      headerShown: formType != "Delete",
    });
  }, [navigation]);

  useEffect(() => {
    if (formType === "Edit") {
      setEnteredName(address.name);
      setEnteredPhoneNumber(address.phoneNumber);
      setEnteredAddress(address.address);
      setSelectedProvince(address.province);
      setSelectedDistrict(address.district);
      setSelectedCommune(address.commune);
    }
  }, []);

  function submitHandler() {
    // Check credentials
    const nameIsValid = enteredName.length > 0;
    const phoneNumberIsValid = enteredPhoneNumber.length === 10;
    const addressIsValid = enteredAddress.length > 0;
    const provinceIsValid = !!selectedProvince;
    const districtIsValid = !!selectedDistrict;
    const communeIsValid = !!selectedCommune;

    setCredentialsInvalid({
      name: !nameIsValid,
      phoneNumber: !phoneNumberIsValid,
      address: !addressIsValid,
      province: !provinceIsValid,
      district: !districtIsValid,
      commune: !communeIsValid,
    });

    if (
      !nameIsValid ||
      !phoneNumberIsValid ||
      !addressIsValid ||
      !provinceIsValid ||
      !districtIsValid ||
      !communeIsValid
    ) {
      return;
    }

    if (formType === "Add") {
      const uploadData = async () => {
        try {
          await addUserAddress(authContext.token, authContext.uid, {
            name: enteredName,
            phoneNumber: enteredPhoneNumber,
            address: enteredAddress,
            province: selectedProvince,
            district: selectedDistrict,
            commune: selectedCommune,
          });

          ToastAndroid.showWithGravity(
            `New address has been add`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.goBack();
        } catch (error) {
          console.log(error.message);
        }
      };
      const response = uploadData();
    }

    if (formType === "Edit") {
      const uploadData = async () => {
        try {
          await updateUserAddress(
            authContext.token,
            authContext.uid,
            address.addressId,
            {
              name: enteredName,
              phoneNumber: enteredPhoneNumber,
              address: enteredAddress,
              province: selectedProvince,
              district: selectedDistrict,
              commune: selectedCommune,
            }
          );

          ToastAndroid.showWithGravity(
            `Save address successfully`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.goBack();
        } catch (error) {
          console.log(error.message);
        }
      };
      const response = uploadData();
    }
  }

  return (
    <>
      {formType !== "Delete" && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.partContainer}>
            <Text style={styles.title}>Name</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              inputOptions={{
                value: enteredName,
                onChangeText: (enteredText) => {
                  setEnteredName(enteredText);
                },
              }}
              isError={credentialsInvalid.name}
              errorText="Name Is Empty!"
            />
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>Phone Number</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              inputOptions={{
                value: enteredPhoneNumber,
                onChangeText: (enteredText) => {
                  setEnteredPhoneNumber(enteredText);
                },
              }}
              isError={credentialsInvalid.phoneNumber}
              errorText="Phone Number Is Empty!"
            />
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>Address</Text>
            <Input
              style={styles.inputContainer}
              onPress={() => {}}
              inputOptions={{
                value: enteredAddress,
                onChangeText: (enteredText) => {
                  setEnteredAddress(enteredText);
                },
              }}
              isError={credentialsInvalid.address}
              errorText="Address Is Empty!"
            />
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>Province/City</Text>
            <Dropdown
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              data={provinceData}
              labelField="name"
              valueField="idProvince"
              value={selectedProvince}
              onChange={(item) => {
                setSelectedProvince(item);
                setSelectedDistrict(null);
              }}
              placeholder="Choose"
              placeholderStyle={styles.selectedTextStyle}
            />
            {credentialsInvalid.province && (
              <Text style={styles.errorText}>Must Select!</Text>
            )}
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>District</Text>
            <Dropdown
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              data={districtData.filter(
                (item) =>
                  !!selectedProvince &&
                  item.idProvince === selectedProvince.idProvince
              )}
              labelField="name"
              valueField="idDistrict"
              value={selectedDistrict}
              onChange={(item) => {
                setSelectedDistrict(item);
              }}
              placeholder="Choose"
              placeholderStyle={styles.selectedTextStyle}
            />
            {credentialsInvalid.district && (
              <Text style={styles.errorText}>Must Select!</Text>
            )}
          </View>

          <View style={styles.partContainer}>
            <Text style={styles.title}>Commune</Text>
            <Dropdown
              style={[styles.dropdown]}
              selectedTextStyle={styles.selectedTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              data={communeData.filter(
                (item) =>
                  !!selectedDistrict &&
                  item.idDistrict === selectedDistrict.idDistrict
              )}
              labelField="name"
              valueField="idCommune"
              value={selectedCommune}
              onChange={(item) => {
                setSelectedCommune(item);
              }}
              placeholder="Choose"
              placeholderStyle={styles.selectedTextStyle}
            />
            {credentialsInvalid.commune && (
              <Text style={styles.errorText}>Must Select!</Text>
            )}
          </View>

          <PrimaryButton onPress={submitHandler}>
            {formType == "Add" ? "Add Address" : "Save Address"}
          </PrimaryButton>
        </ScrollView>
      )}
      {formType === "Delete" && (
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: Colors.Primary_Red,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="alert-outline"
              size={64}
              color={Colors.Background_White}
            />
          </View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: Colors.Neutral_Dark,
              marginVertical: 8,
            }}
          >
            Confirmation
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.Neutral_Grey,
              marginBottom: 16,
            }}
          >
            Are you sure wanna delete address
          </Text>
          <PrimaryButton
            onPress={() => {
              const uploadData = async () => {
                try {
                  await deleteUserAddress(
                    authContext.token,
                    authContext.uid,
                    address.addressId
                  );

                  ToastAndroid.showWithGravity(
                    `Delete address successfully`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                  navigation.goBack();
                } catch (error) {
                  console.log(error.message);
                }
              };
              const response = uploadData();
            }}
            style={{ marginBottom: 24, marginHorizontal: 16 }}
          >
            Delete
          </PrimaryButton>
          <IconButton
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginBottom: 16, marginHorizontal: 16 }}
          >
            Cancel
          </IconButton>
        </View>
      )}
    </>
  );
}

export default AddressFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  partContainer: {
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  inputContainer: {
    marginVertical: 4,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },

  dropdown: {
    borderColor: Colors.Neutral_Light,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginVertical: 4,
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
  errorText: {
    fontSize: 16,
    color: Colors.Primary_Red,
    fontWeight: "bold",
  },
});
