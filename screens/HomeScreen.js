import {
  Image,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/ui/Input";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import TextButton from "../components/ui/TextButton";
import ProductList from "../components/product/ProductList";
import ImageSlider from "../components/ui/imageslider/ImageSlider";
import CategoryList from "../components/category/CategoryList";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  fetchBanners,
  fetchCartProducts,
  fetchCategory,
  fetchFavoriteProducts,
  fetchProducts,
  getProductById,
  getProductIdByType,
  getUserNotificationsNotCheck,
} from "../util/http";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { UserDataContext } from "../store/user-data-context";

function HomeScreen({ navigation }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [megaSaleProducts, setMegaSaleProducts] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [allBanners, setAllBanners] = useState([]);
  const [notifNum, setNotifNum] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            {/* Search Container */}
            <View style={[styles.searchContainer]}>
              <Input
                style={styles.searchInput}
                placeHolder="Search Product"
                leftIcon="search"
                inputOptions={{
                  returnKeyType: "search",
                }}
                iconColor={Colors.Primary_Blue}
                onPress={() => {
                  navigation.navigate("SearchScreen");
                }}
              />

              {/* Favorite */}
              <IconButton
                style={{ borderWidth: 0, padding: 8 }}
                icon={
                  <Ionicons
                    name="heart-outline"
                    size={28}
                    color={Colors.Neutral_Grey}
                  />
                }
                onPress={() => {
                  navigation.navigate("FavoriteProductScreen");
                }}
              />

              {/* Notification */}
              <IconButton
                style={{ borderWidth: 0, padding: 8 }}
                icon={
                  <View>
                    <Ionicons
                      name="notifications-outline"
                      size={28}
                      color={
                        notifNum == 0 ? Colors.Neutral_Grey : Colors.Primary_Red
                      }
                    />

                    {notifNum != 0 && (
                      <View style={styles.numberOfNotificationContainer}>
                        <Text style={styles.numberOfNotificationText}>
                          {notifNum > 99 ? "99+" : notifNum}
                        </Text>
                      </View>
                    )}
                  </View>
                }
                onPress={() => {
                  navigation.navigate("NotificationScreen");
                }}
              />
            </View>
          </>
        );
      },
    });
  }, [navigation, notifNum]);

  async function getData() {
    try {
      setRefreshing(true);
      const banners = await fetchBanners(authContext.token);
      setAllBanners(banners);

      const cate = await fetchCategory(authContext.token);
      setCategory(cate);

      const flashSaleProductIds = await getProductIdByType(
        authContext.token,
        "flash_sale",
        3
      );
      let temps = [];
      for (const item of flashSaleProductIds) {
        try {
          const temp = await getProductById(authContext.token, item);
          temps.push(temp);
        } catch (error) {}
      }
      setFlashSaleProducts(temps);

      const megaSaleProductIds = await getProductIdByType(
        authContext.token,
        "mega_sale",
        3
      );
      temps = [];
      for (const item of megaSaleProductIds) {
        try {
          const temp = await getProductById(authContext.token, item);
          temps.push(temp);
        } catch (error) {}
      }
      setMegaSaleProducts(temps);

      const recommendProductIds = await getProductIdByType(
        authContext.token,
        "recommend"
      );
      temps = [];
      for (const item of recommendProductIds) {
        try {
          const temp = await getProductById(authContext.token, item);
          temps.push(temp);
        } catch (error) {}
      }
      setRecommendProducts(temps);

      const favoriteProductsId = await fetchFavoriteProducts(
        authContext.token,
        authContext.uid
      );
      temps = [];
      for (const item of favoriteProductsId) {
        try {
          const temp = await getProductById(authContext.token, item.productId);
          temps.push(temp);
        } catch (error) {}
      }
      userDataContext.changeFavoriteProducts(temps);

      const cartProductsId = await fetchCartProducts(
        authContext.token,
        authContext.uid
      );
      temps = [];
      for (const item of cartProductsId) {
        try {
          const temp = await getProductById(authContext.token, item.productId);
          temps.push({ ...temp, quantity: item.quantity });
        } catch (error) {}
      }
      userDataContext.changeCartProducts(temps);
    } catch (error) {
      console.log(error.message);
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const response = await getUserNotificationsNotCheck(
          authContext.token,
          authContext.uid
        );
        setNotifNum(response.length);
      } catch (error) {
        // handle exception
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <TouchableWithoutFeedback
      style={styles.outerContainer}
      onPress={() => {
        Keyboard.dismiss();
        setIsSearchFocused(false);
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}
          />
        }
      >
        {/* Banner 1 Image Slider */}
        <View style={styles.banner1Container}>
          <ImageSlider src={allBanners} />
        </View>

        {/* Category */}
        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Category</Text>
          </View>

          <CategoryList
            onItemPress={(type, title) => {
              navigation.navigate("ContentScreen", {
                type: type,
                title: title,
              });
            }}
            items={category}
            listOptions={{
              initialNumToRender: 2,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
              bounce: false,
            }}
          />
        </View>

        {/* Flash Sale */}
        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Flash Sale</Text>
            <TextButton
              textStyle={styles.textButton}
              onPress={() => {
                navigation.navigate("ContentScreen", {
                  type: "flash_sale",
                  title: "Flash Sale",
                });
              }}
            >
              See More
            </TextButton>
          </View>
          <ProductList
            items={flashSaleProducts}
            listOptions={{
              initialNumToRender: 2,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
            }}
          />
        </View>

        {/* Mega Sale */}
        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Mega Sale</Text>
            <TextButton
              onPress={() => {
                navigation.navigate("ContentScreen", {
                  type: "mega_sale",
                  title: "Mega Sale",
                });
              }}
              textStyle={styles.textButton}
            >
              See More
            </TextButton>
          </View>
          <ProductList
            items={megaSaleProducts}
            listOptions={{
              initialNumToRender: 2,
              horizontal: true,
              showsHorizontalScrollIndicator: false,
            }}
          />
        </View>

        {/* Banner 2 */}
        <View style={styles.banner2Container}>
          <Image
            style={{
              backgroundColor: "#000000",
              width: "100%",
              minHeight: 200,
              resizeMode: "contain",
            }}
            source={{ uri: allBanners[0]?.imageUri }}
          />
        </View>
        <View style={styles.listContainer}>
          <ProductList
            items={recommendProducts}
            listOptions={{
              numColumns: 2,
              initialNumToRender: 2,
              scrollEnabled: false,
            }}
            itemOptions={{ width: "46%" }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },

  searchContainer: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Neutral_Light,
  },
  searchInput: {
    flex: 1,
  },
  separateLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.Neutral_Light,
    marginVertical: 8,
  },

  banner1Container: {
    flex: 1,
    marginTop: 8,
    // marginHorizontal: 16,
    // marginVertical: 8
  },

  banner2Container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  listContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  textButton: {
    fontSize: 18,
  },

  numberOfNotificationContainer: {
    position: "absolute",
    left: "50%",
    bottom: "50%",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.Primary_Red,
    alignItems: "center",
    justifyContent: "center",
  },
  numberOfNotificationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.Background_White,
  },
});
