import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import PrimaryButton from "../../components/ui/PrimaryButton";
import IconButton from "../../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { fetchAddress } from "../../util/http";
import { AuthContext } from "../../store/auth-context";

function AddressScreen({ route, navigation }) {
  const [selectedItem, setSelectedItem] = useState({});
  const [allAddress, setAllAddress] = useState([]);
  const authContext = useContext(AuthContext);
  const data = route.params?.data;

  useEffect(() => {
    async function getAddress() {
      try {
        const address = await fetchAddress(authContext.token, authContext.uid);
        setAllAddress(address);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAddress();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allAddress}
        keyExtractor={(item) => item.addressId}
        renderItem={(itemData) => {
          return (
            <Pressable
              onPress={() => {
                !!data && setSelectedItem(itemData.item);
              }}
              style={[
                styles.itemContainer,
                selectedItem.addressId == itemData.item.addressId && {
                  borderColor: Colors.Primary_Blue,
                },
              ]}
            >
              <Text style={styles.title}>{itemData.item.name}</Text>
              <Text
                style={styles.content}
              >{`${itemData.item.address}, ${itemData.item.commune.name}, ${itemData.item.district.name}, ${itemData.item.province.name}`}</Text>
              <Text style={styles.content}>{itemData.item.phoneNumber}</Text>
              <View style={styles.row}>
                <PrimaryButton
                  onPress={() => {
                    navigation.navigate("AddressFormScreen", {
                      type: "Edit",
                      address: itemData.item,
                    });
                  }}
                  style={styles.textButton}
                >
                  Edit
                </PrimaryButton>
                <IconButton
                  onPress={() => {
                    navigation.navigate("AddressFormScreen", {
                      type: "Delete",
                      address: itemData.item,
                    });
                  }}
                  style={styles.iconButton}
                  icon={
                    <Ionicons
                      name="trash-outline"
                      size={24}
                      color={Colors.Neutral_Grey}
                    />
                  }
                />
              </View>
            </Pressable>
          );
        }}
      />
      <PrimaryButton
        onPress={() => {
          if (!!!data) {
            navigation.navigate("AddressFormScreen", { type: "Add" });
          } else {
            if (!!selectedItem.addressId) {
              navigation.navigate("PaymentScreen", {
                data: { ...data, address: selectedItem },
              });
            } else {
              Alert.alert(
                "Forgot to select address!",
                "Please, Select your address!"
              );
            }
          }
        }}
        style={{ margin: 8 }}
      >
        {!!data ? "Next" : "Add Address"}
      </PrimaryButton>
    </View>
  );
}

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  itemContainer: {
    margin: 8,
    padding: 16,
    borderColor: Colors.Neutral_Light,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginVertical: 4,
  },
  content: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
  },
  textButton: {
    width: 90,
  },
  iconButton: {
    marginHorizontal: 16,
  },
});
