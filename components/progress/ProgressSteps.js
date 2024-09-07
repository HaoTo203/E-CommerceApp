import { StyleSheet, View } from "react-native";
import ProgressStep from "./ProgressStep";

function ProgressSteps({ data, workingStep }) {
  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        return (
          <ProgressStep
            key={i}
            active={workingStep - 1 >= i}
            leftLine={i != 0}
            rightLine={i != data.length - 1}
            lastItemActive={workingStep - 1 == i}
            label={item.label}
          />
        );
      })}
    </View>
  );
}

export default ProgressSteps;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
  },
});
