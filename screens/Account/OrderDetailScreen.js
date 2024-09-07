import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import ProgressSteps from "../../components/progress/ProgressSteps";
import OrderProductItem from "../../components/order/OrderProductItem";
import DashedLine from "../../components/ui/DashedLine";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { orderStatus } from "../../constants/data";
import { getMMMDDYYYFormattedDate } from "../../util/date";

const dummyData2 = [
  {
    id: 1,
    brand: "Nike Air Zoom Pegasus 36 Miami",
    price: 299.43,
    isLiked: true,
    quantity: 1,
  },
  {
    id: 2,
    brand: "Nike Air Zoom Pegasus 36 Miami",
    price: 299.43,
    isLiked: false,
    quantity: 1,
  },
];

function OrderDetailScreen({ route }) {
  const order = route.params.order;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Status  */}
      <ProgressSteps data={orderStatus} workingStep={order.status + 1} />

      {/* Product */}
      <View style={styles.partContainer}>
        <Text style={styles.title}>Product</Text>
        <View>
          <FlatList
            data={order.products}
            keyExtractor={(item) => item.productId}
            scrollEnabled={false}
            renderItem={(itemData) => {
              return <OrderProductItem data={itemData.item} />;
            }}
          />
        </View>
      </View>

      {/* Shipping Details */}
      <View style={styles.partContainer}>
        <Text style={styles.title}>Shipping Details</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Date Shipping</Text>
            <Text style={styles.value}>
              {getMMMDDYYYFormattedDate(order.date.toString())}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            {/* TODO: get Shipping department */}
            <Text style={styles.value}>POS Reggular</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>No. Resi</Text>
            {/* TODO: get resi */}
            <Text style={styles.value}>000192848573</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>
              {order.address.address +
                ", " +
                order.address.commune.name +
                ", " +
                order.address.district.name +
                ", " +
                order.address.province.name}
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.partContainer}>
        <Text style={styles.title}>Payment Details</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Item({order.items})</Text>
            <Text style={styles.value}>${order.price}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>${order.shipping}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Coupon</Text>
            <Text style={[styles.value, { color: Colors.Primary_Red }]}>
              -{order.coupon * 100}% ${(order.price * order.coupon).toFixed(2)}
            </Text>
          </View>
          <DashedLine color={Colors.Neutral_Light} />
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                { color: Colors.Neutral_Dark, fontWeight: "bold" },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.value,
                { color: Colors.Primary_Blue, fontWeight: "bold" },
              ]}
            >
              ${(order.price * (1 - order.coupon)).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Notify */}
      <PrimaryButton
        style={{ marginBottom: 16, marginHorizontal: 8 }}
        onPress={() => {
          // TODO: turn on notification
        }}
      >
        Notify Me
      </PrimaryButton>
    </ScrollView>
  );
}

export default OrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 16,
  },

  partContainer: {
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },

  content: {
    borderWidth: 1,
    borderColor: Colors.Neutral_Grey,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 4,
  },

  label: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },
  value: {
    fontSize: 16,
    color: Colors.Neutral_Dark,
    maxWidth: "60%",
    textAlign: "right",
  },
});
