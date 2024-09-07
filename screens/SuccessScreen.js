import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import PrimaryButton from "../components/ui/PrimaryButton";
import IconButton from "../components/ui/IconButton";
import { StackActions, NavigationActions } from "@react-navigation/native";

function SuccessScreen({ navigation }) {
  return (
    <View
      style={[
        {
          flex: 1,
          margin: 8,
        },
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: Colors.Primary_Blue,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="checkmark-outline"
          size={64}
          color={Colors.Background_White}
        />
      </View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: Colors.Neutral_Dark,
          marginVertical: 8,
        }}
      >
        Success
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: Colors.Neutral_Grey,
          marginBottom: 16,
        }}
      >
        Thank you for shopping using lafyuu
      </Text>
      <PrimaryButton
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "BottomTab" }],
          });
        }}
        style={{ marginBottom: 24, marginHorizontal: 16 }}
      >
        Back To Home
      </PrimaryButton>
    </View>
  );
}

export default SuccessScreen;
