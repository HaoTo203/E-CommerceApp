import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import IconButton from "../ui/IconButton";
import { Ionicons } from "@expo/vector-icons";

function ProductItem({ data, itemOptions, onPress, onRemovePress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        !!itemOptions && itemOptions,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            !!data.imageUri
              ? { uri: data.imageUri }
              : require("../../assets/images/ImageProduct.png")
          }
        />
      </View>
      <Text style={styles.brandText} numberOfLines={2} ellipsizeMode="tail">
        {data.brand}
      </Text>
      <Text style={styles.offerPriceText}>
        ${(data.price * (1 - data.offer)).toFixed(2)}
      </Text>
      <View style={styles.offerContainer}>
        <Text style={styles.priceText}>${data.price}</Text>
        <Text style={styles.offerText}>
          {" "}
          {(data.offer * 100).toFixed(0)}% Off
        </Text>
        {!!itemOptions && itemOptions.deleteIcon && (
          <IconButton
            onPress={onRemovePress}
            style={{ borderWidth: 0, padding: 4 }}
            icon={
              <Ionicons name="trash" size={24} color={Colors.Neutral_Grey} />
            }
          />
        )}
      </View>
    </Pressable>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: 150,
    borderColor: Colors.Neutral_Light,
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    margin: 8,
  },
  imageContainer: { flexDirection: "row" },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
  brandText: {
    color: Colors.Neutral_Dark,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  offerPriceText: {
    color: Colors.Primary_Blue,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  offerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: {
    color: Colors.Neutral_Grey,
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  offerText: {
    color: Colors.Primary_Red,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
