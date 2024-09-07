import { StyleSheet, View } from "react-native";
import ProductList from "../components/product/ProductList";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../store/user-data-context";
import { deleteFavoriteProduct, getProductById } from "../util/http";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function FavoriteProductScreen({ navigation }) {
  const userDataContext = useContext(UserDataContext);
  const authContext = useContext(AuthContext);

  function removeProductPressHandler(productId) {
    const deleteHandler = async () => {
      try {
        const response = await deleteFavoriteProduct(
          authContext.token,
          authContext.uid,
          productId
        );

        userDataContext.deleteFavoriteProduct(productId);
      } catch (error) {
        console.log(error.message);
      }
    };
    deleteHandler();
  }
  return (
    <View style={styles.container}>
      <ProductList
        // TODO: Get data from database
        // TODO: Handle remove product from favorite
        items={userDataContext.favoriteProducts}
        listOptions={{
          numColumns: 2,
          initialNumToRender: 10,
        }}
        itemOptions={{ width: "46%", deleteIcon: true }}
        onRemoveProductPress={removeProductPressHandler}
      />
    </View>
  );
}

export default FavoriteProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
