import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function CategoryItem({ data, onPress }) {
  return (
    <Pressable
      onPress={() => {
        onPress(data.type);
      }}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 24, width: 24 }}
          source={
            !!data.imageUri
              ? { uri: data.imageUri }
              : require("../../assets/images/product/shirt.png")
          }
        />
      </View>
      <Text style={styles.title}>{data.title}</Text>
    </Pressable>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 35,
    borderColor: Colors.Neutral_Light,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    color: Colors.Neutral_Grey,
  },
});
