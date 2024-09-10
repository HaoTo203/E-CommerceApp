import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useLayoutEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import RecommendForm from "./RecommendForm";
import { getProductByName } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import { searchHint } from "../../constants/data";

function SearchScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            {/* Search Container */}
            <View style={[styles.searchContainer]}>
              {/* Back Button */}
              <IconButton
                style={{ borderWidth: 0, paddingLeft: 8 }}
                icon={
                  <Ionicons
                    name="arrow-back-outline"
                    size={24}
                    color={Colors.Neutral_Grey}
                  />
                }
                onPress={() => {
                  navigation.goBack();
                }}
              />

              {/* Input Search */}
              <Input
                style={styles.searchInput}
                placeHolder="Search Product"
                leftIcon="search"
                inputOptions={{
                  returnKeyType: "search",
                  autoFocus: true,
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
                      navigation.navigate("SearchResultScreen", {
                        search: searchText,
                        products: response,
                      });
                    } catch (error) {
                      console.log(error.message);
                    }
                  },
                  value: searchText,
                  onChangeText: (enteredText) => {
                    setSearchText(enteredText);
                  },
                }}
                iconColor={Colors.Primary_Blue}
              />

              {/* This Voice button was not implement */}
              {/* Voice */}
              <IconButton
                style={{ borderWidth: 0, paddingRight: 8 }}
                icon={
                  <Ionicons
                    name="mic-outline"
                    size={24}
                    color={Colors.Neutral_Grey}
                    onPress={() => {}}
                  />
                }
              />
            </View>
          </>
        );
      },
    });
  }, [navigation, setSearchText, searchText]);

  return (
    /*
      Recommend Text (Search Hint) when user typing. This feature can be provide by third party.
      This data can also get by calculate most search text by database.
      Here we just go with constant
    */
    <RecommendForm
      data={searchHint}
      onItemPress={(text) => {
        setSearchText(text);
      }}
    />
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Neutral_Light,
  },
  searchInput: {
    flex: 1,
  },
});
