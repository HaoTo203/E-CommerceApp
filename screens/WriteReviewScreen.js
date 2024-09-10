import {
  FlatList,
  Image,
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
import { launchImageLibraryAsync } from "expo-image-picker";

function WriteReviewScreen({ route, navigation }) {
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [imageUri, setImageUri] = useState([]);
  const authContext = useContext(AuthContext);

  const productId = route.params.productId;

  async function sendReviewHandler() {
    const myReview = new Review(authContext.uid, rating, review, imageUri);
    try {
      await postReview(authContext.token, productId, myReview);
    } catch (error) {
      console.log(error.message);
    }
    navigation.goBack();
  }

  async function chooseImageHandler() {
    /*
      - Launch camera to take an image
      - Upload image to storage and get uri
      - Upload uri in realtime database

      *Note: The storage is not provide rest api to upload image, need to use SDKs.
      The code belove just upload direct uri from device to realtime database
      so other user cannot load this image
    */
    try {
      const image = await launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      !image.canceled && setImageUri((prev) => [...prev, image.assets[0].uri]);
    } catch (error) {
      console.log(error.message);
    }
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
            {imageUri.length < 3 && (
              <IconButton
                onPress={chooseImageHandler}
                style={{ width: 88, height: 88, marginHorizontal: 3 }}
                icon={
                  <Ionicons name="add" size={36} color={Colors.Neutral_Grey} />
                }
              />
            )}
            <FlatList
              style={{ flex: 1 }}
              horizontal={true}
              keyExtractor={(item) => item}
              data={imageUri}
              renderItem={(item) => {
                return (
                  <Image
                    style={{ height: 88, width: 88, marginHorizontal: 3 }}
                    source={{ uri: item.item }}
                  />
                );
              }}
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
