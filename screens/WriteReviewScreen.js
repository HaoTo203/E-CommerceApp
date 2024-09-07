import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../constants/styles";
import { Rating } from "react-native-ratings";
import { useContext, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/ui/PrimaryButton";
import Review from "../models/Review";
import { postReview } from "../util/http";
import { AuthContext } from "../store/auth-context";

function WriteReviewScreen({ route, navigation }) {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const authContext = useContext(AuthContext);

  const productId = route.params.productId;

  async function sendReviewHandler() {
    const myReview = new Review(authContext.uid, rating, review, "");
    // TODO: Add image
    try {
      await postReview(authContext.token, productId, myReview);
    } catch (error) {
      console.log(error.message);
    }
    navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsTextInputFocused(false);
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Please write overall level of satisfaction with your Shipping /
          Delivery Service
        </Text>
        <Rating
          type="star"
          showRating
          ratingCount={5}
          startingValue={rating}
          ratingTextColor={Colors.Neutral_Grey}
          onFinishRating={(rating) => {
            setRating(rating);
          }}
        />

        <View style={styles.partContainer}>
          <Text style={styles.title}>Write Your Review</Text>
          <TextInput
            style={[
              styles.comment,
              isTextInputFocused && { borderColor: Colors.Primary_Blue },
            ]}
            placeholder="Write your review here"
            multiline={true}
            textAlignVertical="top"
            placeholderTextColor={Colors.Neutral_Grey}
            onFocus={() => {
              setIsTextInputFocused(true);
            }}
            onBlur={() => {
              setIsTextInputFocused(false);
            }}
            value={review}
            onChangeText={(enteredText) => {
              setReview(enteredText);
            }}
          />
        </View>

        <View style={styles.partContainer}>
          <Text style={styles.title}>Add Photo</Text>
          <View style={{ flexDirection: "row", marginVertical: 16 }}>
            <IconButton
              style={{ width: 88, height: 88, marginHorizontal: 3 }}
              icon={
                <Ionicons name="add" size={36} color={Colors.Neutral_Grey} />
              }
            />
            <IconButton
              style={{ width: 88, height: 88, marginHorizontal: 3 }}
              icon={
                <Ionicons name="add" size={36} color={Colors.Neutral_Grey} />
              }
            />
            <IconButton
              style={{ width: 88, height: 88, marginHorizontal: 3 }}
              icon={
                <Ionicons name="add" size={36} color={Colors.Neutral_Grey} />
              }
            />
            <IconButton
              style={{ width: 88, height: 88, marginHorizontal: 3 }}
              icon={
                <Ionicons name="add" size={36} color={Colors.Neutral_Grey} />
              }
            />
          </View>
        </View>

        {/* Send Review */}
        <PrimaryButton style={{ marginBottom: 16 }} onPress={sendReviewHandler}>
          Send
        </PrimaryButton>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default WriteReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  partContainer: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  comment: {
    height: 200,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Neutral_Grey,
    marginVertical: 8,
    padding: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },
});
