import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import DashedLine from "../../components/ui/DashedLine";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { fetchOrders } from "../../util/http";
import { orderStatus } from "../../constants/data";
import { getMMMDDYYYFormattedDate } from "../../util/date";

function OrderScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const temp = await fetchOrders(authContext.token, authContext.uid);
      setOrders(temp);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orders}
        keyExtractor={(item) => item.orderId}
        renderItem={(itemData) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("OrderDetailScreen", {
                  order: itemData.item,
                });
              }}
              style={({ pressed }) => [
                styles.orderItem,
                pressed && { opacity: 0.7 },
              ]}
            >
              <View style={styles.row}>
                <Text style={styles.id}>{itemData.item.orderId}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>
                  Order at Lafyuu:{" "}
                  {getMMMDDYYYFormattedDate(itemData.item.date.toString())}
                </Text>
              </View>

              <DashedLine color={Colors.Neutral_Light} />
              <View style={styles.row}>
                <Text style={styles.label}>Order Status</Text>
                <Text style={styles.value}>
                  {orderStatus[itemData.item.status].label}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Items</Text>
                <Text style={styles.value}>{itemData.item.items}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Price</Text>
                <Text
                  style={[
                    styles.value,
                    { color: Colors.Primary_Blue, fontWeight: "bold" },
                  ]}
                >
                  $
                  {(itemData.item.price * (1 - itemData.item.coupon)).toFixed(
                    2
                  )}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  orderItem: {
    margin: 8,
    borderWidth: 1,
    borderColor: Colors.Neutral_Grey,
    borderRadius: 5,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
  },
  id: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  label: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },
  value: {
    fontSize: 16,
    color: Colors.Neutral_Dark,
  },
});
