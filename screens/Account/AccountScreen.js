import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../../components/ui/list/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const dummyData = [
  {
    id: 1,
    title: "Profile",
    icon: "person-outline",
  },
  {
    id: 2,
    title: "Order",
    icon: "bag-outline",
  },
  {
    id: 3,
    title: "Address",
    icon: "location-outline",
  },
  {
    id: 4,
    title: "Payment",
    icon: "card-outline",
  },
];
// TODO: Get data
// TODO: Add logic
function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ListItem
              onPress={() => {
                navigation.navigate(itemData.item.title + "Screen");
              }}
              leftIcon={
                <Ionicons
                  style={styles.icon}
                  name={itemData.item.icon}
                  size={28}
                  color={Colors.Primary_Blue}
                />
              }
              title={itemData.item.title}
            />
          );
        }}
      />
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginHorizontal: 16,
  },
});
