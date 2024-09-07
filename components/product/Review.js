import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/styles";
import { getMMMDDYYYFormattedDate } from "../../util/date";

const dummyData = [
  {
    key: 1,
    imageUri: "../../asset/images/review/Product_Picture01.png",
  },
  {
    key: 2,
    imageUri: "../../asset/images/review/Product_Picture02.png",
  },
  {
    key: 3,
    imageUri: "../../asset/images/review/Product_Picture03.png",
  },
];
// TODO: get user information, and review image
function Review({ style, data }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.userContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/images/ProfilePicture.png")}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>James Lowson</Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={16}
            startingValue={data.rating}
            readonly
            style={[styles.rating]}
          />
        </View>
      </View>
      <Text style={styles.review}>{data.review}</Text>

      <FlatList
        style={{ marginVertical: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={dummyData}
        bounces={false}
        renderItem={(itemData) => {
          return (
            <Pressable onPress={() => {}}>
              <Image
                style={{ marginHorizontal: 4, width: 96, height: 96 }}
                source={require("../../assets/images/review/Product_Picture01.png")}
              />
            </Pressable>
          );
        }}
      />
      <Text style={styles.review}>{getMMMDDYYYFormattedDate(data.date)}</Text>
    </View>
  );
}

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    flexDirection: "row",
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameContainer: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginHorizontal: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  review: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginVertical: 16,
  },
});
