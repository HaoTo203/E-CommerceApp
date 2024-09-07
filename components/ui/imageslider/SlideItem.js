import { Image, StyleSheet, useWindowDimensions, View } from "react-native";

function SlideItem({ imageUri }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={
          !!imageUri
            ? { uri: imageUri }
            : require("../../../assets/images/Banner.png")
        }
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
    </View>
  );
}

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { justifyContent: "center", minHeight: 200 },
});
