import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useContext, useLayoutEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import RecommendForm from "./RecommendForm";
import ProductList from "../../components/product/ProductList";
import { getProductByName } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import { searchHint } from "../../constants/data";

function SearchResultScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState(route.params.search);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState(route.params.products);
  const authContext = useContext(AuthContext);

  function searchHandler(isEdit) {
    setIsSearching(isEdit);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            {/* Search Container */}
            <View style={[styles.searchContainer]}>
              {/* Back button */}
              <IconButton
                style={{ borderWidth: 0 }}
                icon={
                  <Ionicons
                    name="arrow-back-outline"
                    size={24}
                    color={Colors.Neutral_Grey}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                }
              />
              {/* Search Box */}
              <Input
                style={styles.searchInput}
                placeHolder="Search Product"
                leftIcon="search"
                inputOptions={{
                  returnKeyType: "search",
                  onSubmitEditing: async () => {
                    /*
                      This helper function get the exact data by comparing name, 
                      not get substring of the name which need to be done in server side.
                    */
                    try {
                      const response = await getProductByName(
                        authContext.token,
                        searchText
                      );
                      setProducts(response);
                    } catch (error) {
                      console.log(error.message);
                    }
                  },
                  value: searchText,
                  onChangeText: (enteredValue) => {
                    setSearchText(enteredValue);
                  },
                }}
                iconColor={Colors.Primary_Blue}
                onEdit={searchHandler}
              />

              {/* Both Sort Button and Filter Button was not implement */}
              {/* Sort */}
              <IconButton
                style={{ borderWidth: 0, padding: 8 }}
                icon={
                  <Octicons
                    name="sort-desc"
                    size={24}
                    color={Colors.Neutral_Grey}
                  />
                }
                onPress={() => {}}
              />

              {/* Filter */}
              <IconButton
                style={{ borderWidth: 0, padding: 8 }}
                icon={
                  <Ionicons
                    name="funnel-outline"
                    size={24}
                    color={Colors.Primary_Blue}
                  />
                }
                onPress={() => {}}
              />
            </View>
          </>
        );
      },
    });
  }, [navigation, setSearchText, searchText, searchHandler]);

  return isSearching ? (
    /*
      Recommend text when user typing. This feature can be provide by third party.
      This data can also get by calculate most search text by database
    */
    <RecommendForm
      data={searchHint}
      onItemPress={(text) => {
        setSearchText(text);
      }}
    />
  ) : (
    <View style={styles.listContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{products.length} Result</Text>
      </View>
      <ProductList
        items={products}
        listOptions={{
          showsVerticalScrollIndicator: false,
          numColumns: 2,
          initialNumToRender: 10,
        }}
        itemOptions={{ width: "46%" }}
      />
    </View>
  );
}

export default SearchResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Neutral_Light,
  },
  searchInput: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Grey,
  },
});
