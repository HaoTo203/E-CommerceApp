import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

const dummyData = [
  {
    id: 1,
    value: "",
  },
  {
    id: 2,
    value: "",
  },
  {
    id: 3,
    value: "",
  },
  {
    id: 4,
    value: "",
  },
  {
    id: 5,
    value: "",
  },
];

// TODO: Change header
// TODO: Get data
function NotificationDetailScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          return (
            <View style={styles.itemContainer}>
              <View>
                <Ionicons
                  style={styles.icon}
                  name="pricetag-outline"
                  size={28}
                  color={Colors.Primary_Blue}
                />
              </View>
              <View>
                <Text style={styles.title}>The Best Price</Text>
                <Text style={styles.description}>
                  Culpa cillum consectetur labore nulla nulla magna irure. Id
                  veniam culpa officia aute dolor amet deserunt ex proident
                  commodo
                </Text>
                <Text style={styles.date}>April 30, 2014 1:01 PM</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default NotificationDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  icon: {
    marginTop: 16,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginVertical: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.Neutral_Dark,
    marginVertical: 4,
  },
});
