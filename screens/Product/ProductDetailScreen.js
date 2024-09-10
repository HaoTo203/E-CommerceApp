import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Pressable,
  ToastAndroid,
  Alert,
} from "react-native";
import ProductList from "../../components/product/ProductList";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import IconButton from "../../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import ImageSlider from "../../components/ui/imageslider/ImageSlider";
import { Rating } from "react-native-ratings";
import { arrOfNumberToArrOfObject } from "../../util/DataConverter";
import TextButton from "../../components/ui/TextButton";
import Review from "../../components/product/Review";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { shoesColor, shoesSize } from "../../constants/data";
import { AuthContext } from "../../store/auth-context";
import {
  addFavoriteProduct,
  addToCart,
  deleteFavoriteProduct,
  fetchProducts,
  fetchReviews,
  fetchUserProfile,
} from "../../util/http";
import { UserDataContext } from "../../store/user-data-context";

function ProductDetailScreen({ route, navigation }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [productSize, setProductSize] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [shownReview, setShownReview] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);

  const productData = route.params.productData;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: productData.brand,
      headerRight: ({ tintColor }) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              onPress={() => {
                navigation.popToTop();
              }}
              style={{ borderWidth: 0, padding: 8 }}
              icon={<Ionicons name="home" size={24} color={tintColor} />}
            />
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    async function getReviews() {
      try {
        const reviews = await fetchReviews(
          authContext.token,
          productData.productId
        );
        setAllReviews(reviews);

        if (reviews.length != 0) {
          const review = reviews.reduce((prev, current) =>
            new Date(prev.date) > new Date(current.date) ? prev : current
          );
          const temp = await fetchUserProfile(authContext.token, review.userId);
          setShownReview({
            ...review,
            username: temp.name,
            userAvatar: temp.imageUri,
          });
        }

        const products = await fetchProducts(authContext.token);
        setSimilarProducts(
          products.filter((product) => {
            return product.brand === productData.brand;
          })
        );

        setIsFavorite(
          userDataContext.favoriteProducts.filter(
            (item) => item.productId === productData.productId
          ).length !== 0
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getReviews();
  }, []);

  function addToCartHandler() {
    const sizeIsValid = productSize !== 0;
    const colorIsValid = productColor !== "";

    if (!sizeIsValid || !colorIsValid) {
      Alert.alert("In valid size or color!", "Please, Choose size and color!");
      return;
    }

    const data = {
      quantity: 1,
      size: productSize,
      color: productColor,
    };
    const uploadData = async () => {
      try {
        const response = await addToCart(
          authContext.token,
          authContext.uid,
          productData.productId,
          data
        );
        userDataContext.addCartProduct({
          ...productData,
          quantity: 1,
        });
      } catch (error) {
        error.message;
      }
    };
    uploadData();

    ToastAndroid.showWithGravity(
      `${productData.brand} has been add to your cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  function pressHeartIconHandler() {
    const addToFavoriteProduct = async () => {
      try {
        if (isFavorite) {
          await deleteFavoriteProduct(
            authContext.token,
            authContext.uid,
            productData.productId
          );
          userDataContext.deleteFavoriteProduct(productData.productId);
          setIsFavorite((prev) => !prev);
        } else {
          await addFavoriteProduct(
            authContext.token,
            authContext.uid,
            productData.productId,
            {
              date: new Date(),
            }
          );
          userDataContext.addFavoriteProduct(productData);
          setIsFavorite((prev) => !prev);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    addToFavoriteProduct();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Product Image */}
        <View>
          <ImageSlider src={[{ id: 1, imageUri: productData.imageUri }]} />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.brand}>{productData.brand}</Text>
            <IconButton
              onPress={pressHeartIconHandler}
              style={{ borderWidth: 0, padding: 4 }}
              icon={
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? Colors.Primary_Red : Colors.Neutral_Grey}
                />
              }
            />
          </View>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={16}
            startingValue={
              allReviews.length != 0
                ? (
                    allReviews.reduce((total, next) => total + next.rating, 0) /
                    allReviews.length
                  ).toFixed(1)
                : 0
            }
            readonly
            style={styles.rating}
          />
          <Text style={styles.price}>
            ${(productData.price * (1 - productData.offer)).toFixed(2)}
          </Text>
        </View>

        {/* Select Size */}
        <View style={styles.partContainer}>
          <Text style={styles.title}>Select Size</Text>
          <FlatList
            style={{ marginVertical: 8 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={arrOfNumberToArrOfObject(shoesSize)}
            keyExtractor={(item) => item.key}
            bounces={false}
            renderItem={(itemData) => {
              return (
                <Pressable
                  style={[
                    styles.sizeItem,
                    productSize == itemData.item.value && {
                      borderColor: Colors.Primary_Blue,
                    },
                  ]}
                  onPress={() => {
                    setProductSize(itemData.item.value);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: Colors.Neutral_Dark,
                    }}
                  >
                    {itemData.item.value}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>

        {/* Select Color */}
        <View style={styles.partContainer}>
          <Text style={styles.title}>Select Color</Text>
          <FlatList
            style={{ marginVertical: 8 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={shoesColor}
            bounces={false}
            renderItem={(itemData) => {
              return (
                <Pressable
                  style={[
                    styles.colorItem,
                    { backgroundColor: itemData.item.color },
                  ]}
                  onPress={() => {
                    setProductColor(itemData.item.color);
                  }}
                >
                  {itemData.item.color == productColor && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: Colors.Background_White,
                        borderRadius: 10,
                      }}
                    ></View>
                  )}
                </Pressable>
              );
            }}
          />
        </View>

        {/* Description */}
        <View style={styles.partContainer}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{productData.description}</Text>
        </View>

        {/* Review */}
        <View style={styles.partContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Review Product</Text>
            <TextButton
              onPress={() => {
                navigation.navigate("ReviewScreen", {
                  productId: productData.productId,
                });
              }}
              textStyle={styles.textButton}
            >
              See More
            </TextButton>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={16}
              startingValue={
                allReviews.length != 0
                  ? (
                      allReviews.reduce(
                        (total, next) => total + next.rating,
                        0
                      ) / allReviews.length
                    ).toFixed(1)
                  : 0
              }
              readonly
              style={[styles.rating]}
            />
            <Text
              style={{
                fontSize: 14,
                color: Colors.Neutral_Grey,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {allReviews.length != 0
                  ? (
                      allReviews.reduce(
                        (total, next) => total + next.rating,
                        0
                      ) / allReviews.length
                    ).toFixed(1)
                  : 0}
              </Text>{" "}
              {"("}
              {allReviews.length} Review{")"}
            </Text>
          </View>
          {!!shownReview && <Review data={shownReview} />}
        </View>

        {/* Other Product */}
        <View style={styles.partContainer}>
          <Text style={styles.title}>You Might Also Like</Text>
          <ProductList
            items={similarProducts}
            listOptions={{
              initialNumToRender: 2,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
            }}
          />
        </View>
      </ScrollView>
      <PrimaryButton onPress={addToCartHandler} style={{ margin: 16 }}>
        Add To Cart
      </PrimaryButton>
    </View>
  );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  brand: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    maxWidth: "80%",
  },
  rating: {
    marginVertical: 8,
    alignItems: "flex-start",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.Primary_Blue,
  },

  partContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginBottom: 8,
  },

  sizeItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    borderColor: Colors.Neutral_Grey,
    marginTop: 8,
  },

  colorItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginTop: 8,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textButton: {
    fontSize: 18,
  },
});
