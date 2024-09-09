import { Image, StyleSheet, View, ScrollView } from "react-native";
import ProductList from "../components/product/ProductList";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { getProductById, getProductIdByType } from "../util/http";

function ContentScreen({ navigation, route }) {
  const [products, setProducts] = useState([]);
  const authContext = useContext(AuthContext);
  const type = route.params?.type;
  const title = route.params?.title;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      // headerRight: ({ tintColor }) => {
      //   return (
      //     <IconButton
      //       style={{ borderWidth: 0, padding: 8 }}
      //       icon={<Ionicons name="search" size={24} color={tintColor} />}
      //     />
      //   );
      // },
    });
  }, [navigation]);

  useEffect(() => {
    const getData = async () => {
      try {
        const productIds = await getProductIdByType(authContext.token, type);
        const products = [];
        for (const item of productIds) {
          try {
            const temp = await getProductById(authContext.token, item);
            products.push(temp);
          } catch (error) {
            console.log(error.message);
          }
        }
        setProducts(products);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bannerContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/PromotionImage.png")}
          />
        </View>
        <View style={styles.productContainer}>
          <ProductList
            items={products}
            listOptions={{
              numColumns: 2,
              initialNumToRender: 2,
              scrollEnabled: false,
            }}
            itemOptions={{ width: "46%" }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    margin: 16,
    alignItems: "center",
  },
  image: {
    resizeMode: "stretch",
    width: "100%",
  },
  productContainer: {
    flex: 1,
  },
});
