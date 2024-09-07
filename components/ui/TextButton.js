import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function TextButton({ children, style, onPress, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.outerContainer,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default TextButton;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "flex-start",
    backgroundColor: Colors.Background_White,
  },
  text: {
    color: Colors.Primary_Blue,
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },
});
