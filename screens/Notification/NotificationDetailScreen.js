import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getNotificationById, updateUserNotifications } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import { getMMMDDYYY_HHMMFormattedDate } from "../../util/date";

function NotificationDetailScreen({ route, navigation }) {
  const [notifications, setNotifications] = useState([]);
  const authContext = useContext(AuthContext);
  const type = route.params.type;
  const data = route.params.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type,
    });
  }, [navigation]);

  useEffect(() => {
    const getData = async () => {
      try {
        const temp = [];
        for (const item of data) {
          const response = await getNotificationById(
            authContext.token,
            item.notificationId
          );
          temp.push({
            userNotId: item.userNotId,
            isChecked: item.isChecked,
            ...response,
          });
        }

        temp.sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
        setNotifications(temp);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notificationId}
        renderItem={(item) => {
          return (
            <Pressable
              onPress={async () => {
                try {
                  const response = await updateUserNotifications(
                    authContext.token,
                    authContext.uid,
                    item.item
                  );
                  setNotifications((prev) => {
                    const temp = prev;
                    temp[
                      prev.findIndex(
                        (element) =>
                          element.notificationId === item.item.notificationId
                      )
                    ].isChecked = true;
                    return [...temp];
                  });
                } catch (error) {
                  console.log(error.message);
                }
              }}
              style={({ pressed }) => [
                styles.itemContainer,
                !item.item.isChecked && {
                  backgroundColor: Colors.Neutral_Light,
                },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View>
                <Ionicons
                  style={styles.icon}
                  name="pricetag-outline"
                  size={28}
                  color={Colors.Primary_Blue}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.item.title}</Text>
                <Text style={styles.description}>{item.item.content}</Text>
                <Text style={styles.date}>
                  {getMMMDDYYY_HHMMFormattedDate(item.item.date)}
                </Text>
              </View>
            </Pressable>
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
  },
  itemContainer: {
    flexDirection: "row",
    padding: 16,
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
