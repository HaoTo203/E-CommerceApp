import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/ui/IconButton";
import { Rating } from "react-native-ratings";
import { useContext, useEffect, useState } from "react";
import { Colors } from "../constants/styles";
import Review from "../components/product/Review";
import PrimaryButton from "../components/ui/PrimaryButton";
import { starNumber } from "../constants/data";
import { AuthContext } from "../store/auth-context";
import { fetchReviews, fetchUserProfile } from "../util/http";

function ReviewScreen({ route, navigation }) {
  const [selectedRate, setSelectedRate] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [shownReviews, setShownReviews] = useState([]);
  const productId = route.params.productId;

  const authContext = useContext(AuthContext);

  // Fetch new data whenever this screen regain focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const temps = await fetchReviews(authContext.token, productId);

        const reviews = [];
        for (const review of temps) {
          const temp = await fetchUserProfile(authContext.token, review.userId);
          reviews.push({
            ...review,
            username: temp.name,
            userAvatar: temp.imageUri,
          });
        }

        setAllReviews(reviews);
        setShownReviews(reviews);
      } catch (error) {
        console.log(error.message);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <ScrollView
            style={styles.ratingFilter}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
          >
            {starNumber.map((item, index) => {
              return (
                <IconButton
                  key={index}
                  icon={
                    index != 0 && (
                      <Rating
                        type="star"
                        ratingCount={1}
                        imageSize={16}
                        startingValue={1}
                        readonly
                        style={styles.star}
                      />
                    )
                  }
                  style={[
                    { marginHorizontal: 8 },
                    index == selectedRate && styles.selectedRate,
                  ]}
                  textColor={index == selectedRate && Colors.Primary_Blue}
                  onPress={() => {
                    setShownReviews(
                      allReviews.filter(
                        (review) => review.rating == index || index == 0
                      )
                    );
                    setSelectedRate(index);
                  }}
                >
                  {item}
                </IconButton>
              );
            })}
          </ScrollView>

          {/* Separate Line */}
          <View style={styles.separateLine} />

          {/* Review */}
          <FlatList
            style={styles.reviewContainer}
            initialNumToRender={2}
            scrollEnabled={false}
            data={shownReviews}
            keyExtractor={(item) => item.reviewId}
            renderItem={(dataItem) => {
              return <Review data={dataItem.item} style={styles.reviewItem} />;
            }}
          />
        </ScrollView>
      </View>

      {/* Write Review */}
      <PrimaryButton
        style={{ marginBottom: 16, marginHorizontal: 16 }}
        onPress={() => {
          navigation.navigate("WriteReviewScreen", { productId: productId });
        }}
      >
        Write Review
      </PrimaryButton>
    </>
  );
}

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ratingFilter: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  star: {
    marginRight: 8,
  },
  selectedRate: {
    borderColor: Colors.Primary_Blue,
  },
  separateLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.Neutral_Light,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  reviewContainer: {
    marginHorizontal: 16,
  },
  reviewItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Neutral_Light,
    marginBottom: 16,
  },
});
