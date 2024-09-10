import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../../components/ui/list/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { accountSection } from "../../constants/data";
function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={accountSection}
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
