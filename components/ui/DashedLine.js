import { View } from "react-native";

function DashedLine({ color }) {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        borderRadius: 1,
        borderWidth: 1,
        borderColor: color,
        borderStyle: "dashed",
        zIndex: 0,
        marginVertical: 8,
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 1,
          backgroundColor: "white",
          zIndex: 1,
        }}
      />
    </View>
  );
}

export default DashedLine;
