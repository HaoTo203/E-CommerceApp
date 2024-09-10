import { FlatList, StyleSheet, ToastAndroid, View } from "react-native";
import { Colors } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import ListItem from "../../components/ui/list/ListItem";

function PaymentScreen({ route, navigation }) {
  const data = route.params?.data;
  return (
    <View style={styles.container}>
      {/* Pay by credit card */}
      <ListItem
        onPress={() => {
          navigation.navigate("CardScreen", !!data && { data: data });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="card-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Credit Card Or Debit"
      />

      {/* Other payment method */}
      <ListItem
        onPress={() => {
          ToastAndroid.showWithGravity(
            `Not provide yet`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="wallet-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Bank Transfer"
      />
    </View>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
