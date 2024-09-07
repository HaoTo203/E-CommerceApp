import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function ProgressStep({ active, leftLine, rightLine, lastItemActive, label }) {
  return (
    <View style={[styles.step]}>
      <View
        style={[
          styles.line,
          leftLine && { left: 0 },
          rightLine && { right: 0 },
          active && lastItemActive && { backgroundColor: Colors.Neutral_Light },
        ]}
      ></View>
      <View
        style={[
          styles.line,
          leftLine && { left: 0 },
          rightLine && !lastItemActive && { right: 0 },
          active && { backgroundColor: Colors.Primary_Blue },
        ]}
      ></View>
      <View
        style={[
          styles.iconStatus,
          active && { backgroundColor: Colors.Primary_Blue },
        ]}
      >
        <Ionicons
          name="checkmark-outline"
          size={24}
          color={Colors.Background_White}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default ProgressStep;

const styles = StyleSheet.create({
  iconStatus: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: Colors.Neutral_Grey,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Neutral_Light,
  },
  line: {
    position: "absolute",
    top: 16,
    right: "50%",
    left: "50%",
    height: 1,
    backgroundColor: Colors.Neutral_Light,
  },

  step: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginTop: 16,
  },
});
