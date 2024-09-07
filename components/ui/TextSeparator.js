import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";

function TextSeparator({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.separator} />
      <View>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );
}

export default TextSeparator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.Neutral_Grey,
  },
  text: {
    marginHorizontal: 30,
    textAlign: "center",
    color: Colors.Neutral_Grey,
    fontSize: 16,
    fontWeight: "bold",
  },
});
