import {
  Image,
  Keyboard,
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
} from "../util/http";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { UserDataContext } from "../store/user-data-context";

const dummyData3 = [
  {
    id: 1,
    title: "Man Shirt",
  },
  {
    id: 2,
    title: "Man Shirt",
  },
  {
    id: 3,
    title: "Man Shirt",
  },
  {
    id: 4,
    title: "Man Shirt",
  },
  {
    id: 5,
    title: "Man Shirt",
  },
];

function HomeScreen({ navigation }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [megaSaleProducts, setMegaSaleProducts] = useState([]);
  const [recommendProducts, setRecommendProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [allBanners, setAllBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                    size={24}
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
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color={Colors.Neutral_Grey}
                  />
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
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
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
            const temp = await getProductById(
              authContext.token,
              item.productId
            );
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
            const temp = await getProductById(
              authContext.token,
              item.productId
            );
            temps.push({ ...temp, quantity: item.quantity });
          } catch (error) {}
        }
        userDataContext.changeCartProducts(temps);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message={""} />;
  }

  return (
    <TouchableWithoutFeedback
      style={styles.outerContainer}
      onPress={() => {
        Keyboard.dismiss();
        setIsSearchFocused(false);
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
});
