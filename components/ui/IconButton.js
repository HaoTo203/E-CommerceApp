import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";

function IconButton({ disabled, children, onPress, style, icon, textColor }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.outerContainer,
        style,
        pressed && styles.pressed,
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        {icon}
        {!!children && (
          <Text style={[styles.text, !!textColor && { color: textColor }]}>
            {children}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Background_White,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Neutral_Light,
    padding: 16,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },
  pressed: {
    opacity: 0.7,
  },
});
