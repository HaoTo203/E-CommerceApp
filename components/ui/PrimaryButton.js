import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function PrimaryButton({ children, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.outerContainer,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    backgroundColor: Colors.Primary_Blue,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Background_White,
  },
  pressed: {
    opacity: 0.7,
  },
});
