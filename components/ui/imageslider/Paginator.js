import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import { Colors } from "../../../constants/styles";

function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: [
            Colors.Neutral_Light,
            Colors.Primary_Blue,
            Colors.Neutral_Light,
          ],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { backgroundColor: dotColor }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});
