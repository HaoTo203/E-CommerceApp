import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";

function OrderProductItem({
  data,
  isCartItem,
  onDeletePress,
  onChangeQuantity,
}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: data.imageUri }} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.brand}>{data.brand}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <IconButton
              style={styles.iconButton}
              icon={
                <Ionicons
                  name={!!isLiked ? "heart" : "heart-outline"}
                  color={Colors.Primary_Red}
                  size={24}
                />
              }
            /> */}
            {isCartItem && (
              <IconButton
                onPress={() => {
                  onDeletePress(data.productId);
                }}
                style={[styles.iconButton, { marginLeft: 4 }]}
                icon={
                  <Ionicons
                    name={"trash-bin-outline"}
                    color={Colors.Neutral_Grey}
                    size={24}
                  />
                }
              />
            )}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>${data.price}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {isCartItem && (
              <IconButton
                disabled={data.quantity == 1}
                onPress={() => {
                  if (data.quantity > 1) {
                    const newData = { ...data };
                    newData.quantity--;
                    onChangeQuantity(newData);
                  }
                }}
                style={{ padding: 0 }}
                icon={
                  <Ionicons
                    name={"remove-outline"}
                    color={Colors.Neutral_Grey}
                    size={24}
                  />
                }
              />
            )}
            <Text
              style={{
                fontSize: 16,
                color: Colors.Neutral_Dark,
                minWidth: 32,
                backgroundColor: Colors.Neutral_Light,
                textAlign: "center",
              }}
            >
              {data.quantity}
            </Text>
            {isCartItem && (
              <IconButton
                onPress={() => {
                  const newData = { ...data };
                  newData.quantity++;
                  onChangeQuantity(newData);
                }}
                style={{ padding: 0 }}
                icon={
                  <Ionicons
                    name={"add-outline"}
                    color={Colors.Neutral_Grey}
                    size={24}
                  />
                }
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default OrderProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.Neutral_Light,
    borderRadius: 5,
  },
  image: {
    width: 96,
    height: 96,
  },
  content: {
    justifyContent: "space-evenly",
    flex: 1,
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    maxWidth: "75%",
  },
  iconButton: { padding: 0, borderWidth: 0 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Primary_Blue,
  },
});
