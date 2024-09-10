import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { useLayoutEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import RecommendForm from "./RecommendForm";
import ProductList from "../../components/product/ProductList";

const dummyData = [
  {
    id: 1,
    text: "Recommend Product",
  },
  {
    id: 2,
    text: "Recommend Product",
  },
  {
    id: 3,
    text: "Recommend Product",
  },
  {
    id: 4,
    text: "Recommend Product",
  },
  {
    id: 5,
    text: "Recommend Product",
  },
];

const dummyData2 = [
  {
    productId: "295e5cda-951e-4d7a-ac1e-e0adcb91cd85",
    image: "http://dummyimage.com/244x100.png/cc0000/ffffff",
    brand: "Adidas",
    price: 233.3,
    offer: 0.49,
  },
  {
    productId: "f5c26e55-6cf3-4e70-b2ed-346a9a8a3c9a",
    image: "http://dummyimage.com/211x100.png/ff4444/ffffff",
    brand: "Reebok",
    price: 195.11,
    offer: 0.96,
  },
  {
    productId: "83ef052a-c5c6-4d7b-8db0-10b9f586d20c",
    image: "http://dummyimage.com/209x100.png/ff4444/ffffff",
    brand: "Reebok",
    price: 122.39,
    offer: 0.71,
  },
  {
    productId: "b79eca7f-099f-4e3b-aac3-96cda140bbef",
    image: "http://dummyimage.com/245x100.png/ff4444/ffffff",
    brand: "Adidas",
    price: 212.36,
    offer: 0.58,
  },
  {
    productId: "83ef052a-c5c6-4d7b-8db0-10b9f520c",
    image: "http://dummyimage.com/209x100.png/ff4444/ffffff",
    brand: "Reebok",
    price: 122.39,
    offer: 0.71,
  },
  {
    productId: "b79eca7f-099f-4e3b-aac3-cda140bbef",
    image: "http://dummyimage.com/245x100.png/ff4444/ffffff",
    brand: "Adidas",
    price: 212.36,
    offer: 0.58,
  },
];

function SearchResultScreen({ route, navigation }) {
  const [searchText, setSearchText] = useState(route.params.search);
  const [isSearching, setIsSearching] = useState(false);

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
              {/* Voice */}
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
              <Input
                style={styles.searchInput}
                placeHolder="Search Product"
                leftIcon="search"
                inputOptions={{
                  returnKeyType: "search",
                  value: searchText,
                  onChangeText: (enteredValue) => {
                    setSearchText(enteredValue);
                  },
                }}
                iconColor={Colors.Primary_Blue}
                onEdit={searchHandler}
              />

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
    <RecommendForm data={dummyData} />
  ) : (
    <View style={styles.listContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{dummyData2.length} Result</Text>
      </View>
      <ProductList
        items={dummyData2}
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
