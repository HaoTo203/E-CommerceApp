import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import ListItem from "../../components/ui/list/ListItem";

const dummyData = [
  {
    id: 1,
    title: "Offer",
  },
  {
    id: 2,
    title: "Feed",
  },
  {
    id: 3,
    title: "Activity",
  },
];

// TODO: Change header
// TODO: Get data
function NotificationScreen({ navigation }) {
  function pressHandler() {
    navigation.navigate("NotificationDetailScreen");
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ListItem
              onPress={pressHandler}
              leftIcon={
                <Ionicons
                  style={styles.icon}
                  name="pricetag-outline"
                  size={28}
                  color={Colors.Primary_Blue}
                />
              }
              title={itemData.item.title}
              rightIcon={
                <View style={styles.numberOfNotificationContainer}>
                  <Text style={styles.numberOfNotificationText}>
                    {itemData.index + 2}
                  </Text>
                </View>
              }
            />
          );
        }}
      />
    </View>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  partContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    margin: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginHorizontal: 16,
  },
  numberOfNotificationContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.Primary_Red,
    alignItems: "center",
    justifyContent: "center",
  },
  numberOfNotificationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.Background_White,
  },
  pressed: {
    opacity: 0.7,
  },
});
