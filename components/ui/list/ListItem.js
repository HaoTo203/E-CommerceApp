import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/styles";

function ListItem({ leftIcon, title, rightIcon, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      {!!leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }}></View>
      {rightIcon}
    </Pressable>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  icon: {
    margin: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginHorizontal: 16,
  },
  pressed: {
    backgroundColor: Colors.Neutral_Light,
  },
});
