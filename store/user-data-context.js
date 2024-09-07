import { createContext, useState } from "react";

export const UserDataContext = createContext({
  favoriteProducts: [],
  addFavoriteProduct: () => {},
  deleteFavoriteProduct: () => {},
  updateCartProduct: () => {},
  changeFavoriteProducts: () => {},

  cartProducts: [],
  addCartProduct: () => {},
  deleteCartProduct: () => {},
  changeCartProducts: () => {},

  profile: {},
  changeProfile: () => {},

  deleteData: () => {},
});

function UserDataContextProvider({ children }) {
  const [favoriteProducts, setFavoriteProducts] = useState();
  const [cartProducts, setCartProducts] = useState();
  const [profile, setProfile] = useState();

  // Data for Favorite Product
  function addFavoriteProduct(product) {
    setFavoriteProducts((prev) => [product, ...prev]);
  }

  function changeFavoriteProducts(data) {
    setFavoriteProducts(data);
  }

  function deleteFavoriteProduct(productId) {
    setFavoriteProducts((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
  }

  // Data for User Cart
  function addCartProduct(product) {
    setCartProducts((prev) => [product, ...prev]);
  }

  function changeCartProducts(data) {
    setCartProducts(data);
  }

  function updateCartProduct(product) {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.productId === product.productId ? product : item
      )
    );
  }

  function deleteCartProduct(productId) {
    setCartProducts((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
  }

  function changeProfile(data) {
    setProfile(data);
  }

  function deleteData() {
    setFavoriteProducts(null);
  }

  const value = {
    cartProducts: cartProducts,
    addCartProduct: addCartProduct,
    updateCartProduct: updateCartProduct,
    deleteCartProduct: deleteCartProduct,
    changeCartProducts: changeCartProducts,

    favoriteProducts: favoriteProducts,
    addFavoriteProduct: addFavoriteProduct,
    deleteFavoriteProduct: deleteFavoriteProduct,
    changeFavoriteProducts: changeFavoriteProducts,

    profile: profile,
    changeProfile: changeProfile,

    deleteData: deleteData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
