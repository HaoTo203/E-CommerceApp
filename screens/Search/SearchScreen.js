import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import IconButton from "../../components/ui/IconButton";
import Input from "../../components/ui/Input";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLayoutEffect, useState } from "react";
import { Colors } from "../../constants/styles";
import RecommendForm from "./RecommendForm";

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

function SearchScreen({ navigation }) {
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
                }}
                iconColor={Colors.Primary_Blue}
              />

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
  }, [navigation]);

  return <RecommendForm data={dummyData} />;
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
