import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { cc_format } from "../../util/DataConverter";

function Card({ onPress, cardInfo, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        style,
        pressed && { opacity: 0.7 },
      ]}
    >
      <View style={{ flexDirection: "row", margin: 16 }}>
        <View style={styles.circle}></View>
        <View
          style={[styles.circle, { position: "absolute", left: 16 }]}
        ></View>
      </View>
      <Text style={styles.cardNumber}>{cc_format(cardInfo.cardNumber)}</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.title}>CARD HOLDER</Text>
          <Text style={styles.content}>{cardInfo.cardHolder}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.title}>EXPIRY DATE</Text>
          <Text style={styles.content}>{cardInfo.expiryDate}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    backgroundColor: Colors.Primary_Purple,
    margin: 8,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    marginVertical: 8,
  },
  col: {
    marginHorizontal: 16,
  },
  cardNumber: {
    textAlign: "center",
    marginHorizontal: 16,
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.Background_White,
  },
  title: {
    opacity: 0.5,
    fontSize: 14,
    color: Colors.Background_White,
  },
  content: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.Background_White,
    marginVertical: 8,
  },
  circle: {
    opacity: 0.8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.Neutral_Grey,
  },
});
