import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import ListItem from "../../components/ui/list/ListItem";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { fetchUserNotifications } from "../../util/http";

function NotificationScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [offerNot, setOfferNot] = useState([]);
  const [feedNot, setFeedNot] = useState([]);
  const [orderNot, setOrderNot] = useState([]);
  const [offerNum, setOfferNum] = useState(0);
  const [feedNum, setFeedNum] = useState(0);
  const [orderNum, setOrderNum] = useState(0);

  const getData = async () => {
    try {
      const response = await fetchUserNotifications(
        authContext.token,
        authContext.uid
      );
      setOfferNot(response.filter((item) => item.type === "offer"));
      setFeedNot(response.filter((item) => item.type === "feed"));
      setOrderNot(response.filter((item) => item.type === "order"));
      setOfferNum(
        response.filter((item) => item.type === "offer" && !item.isChecked)
          .length
      );
      setFeedNum(
        response.filter((item) => item.type === "feed" && !item.isChecked)
          .length
      );
      setOrderNum(
        response.filter((item) => item.type === "order" && !item.isChecked)
          .length
      );
    } catch (error) {
      // Handle exception
      console.log(error.message);
    }
  };

  // This function will run whenever the screen regain focus to fetch data
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  function pressHandler(type, data) {
    navigation.navigate("NotificationDetailScreen", { type: type, data: data });
  }
  return (
    <View style={styles.container}>
      {/* Offer */}
      <ListItem
        onPress={() => {
          pressHandler("Offer", offerNot);
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="pricetag-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Offer"
        rightIcon={
          offerNum != 0 && (
            <View style={styles.numberOfNotificationContainer}>
              <Text style={styles.numberOfNotificationText}>{offerNum}</Text>
            </View>
          )
        }
      />

      {/* Feed */}
      <ListItem
        onPress={() => {
          pressHandler("Feed", feedNot);
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="list-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Feed"
        rightIcon={
          feedNum != 0 && (
            <View style={styles.numberOfNotificationContainer}>
              <Text style={styles.numberOfNotificationText}>{feedNum}</Text>
            </View>
          )
        }
      />

      {/* Order */}
      <ListItem
        onPress={() => {
          pressHandler("Order", orderNot);
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="notifications-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Order"
        rightIcon={
          orderNum != 0 && (
            <View style={styles.numberOfNotificationContainer}>
              <Text style={styles.numberOfNotificationText}>{orderNum}</Text>
            </View>
          )
        }
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
