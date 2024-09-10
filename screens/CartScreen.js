import {
  FlatList,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OrderProductItem from "../components/order/OrderProductItem";
import { Colors } from "../constants/styles";
import PrimaryButton from "../components/ui/PrimaryButton";
import Input from "../components/ui/Input";
import DashedLine from "../components/ui/DashedLine";
import { useContext, useEffect, useState } from "react";
import {
  addCoupons,
  deleteCartProduct,
  fetchCartProducts,
  getCouponByCode,
  getProductById,
  updateCartProductQuantity,
} from "../util/http";
import { AuthContext } from "../store/auth-context";
import { UserDataContext } from "../store/user-data-context";
function CartScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);
  const [refreshing, setRefreshing] = useState(false);
  const [offer, setOffer] = useState(0.0);
  const [couponCode, setCouponCode] = useState("");

  // This function using function from util http to fetch data
  const fetchData = async () => {
    async function getCartProducts() {
      setRefreshing(true);
      try {
        const productsId = await fetchCartProducts(
          authContext.token,
          authContext.uid
        );
        const products = [];

        for (const product of productsId) {
          try {
            const productInfo = await getProductById(
              authContext.token,
              product.productId
            );
            products.push({ ...productInfo, quantity: product.quantity });
          } catch (error) {
            console.log(error.message);
          }
        }
        userDataContext.changeCartProducts(products);
      } catch (error) {
        console.log(error.message);
      } finally {
        setRefreshing(false);
      }
    }
    getCartProducts();
  };
  return (
    <View style={styles.container}>
      {/* Product */}
      <View style={[styles.partContainer, { flex: 1 }]}>
        <View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  fetchData();
                }}
              />
            }
            data={userDataContext.cartProducts}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => {
              return (
                <OrderProductItem
                  onDeletePress={(productId) => {
                    /*
                      Function remove product from user cart include
                      - Remove from database
                      - Remove from context
                    */
                    const deleteHandler = async () => {
                      try {
                        const response = await deleteCartProduct(
                          authContext.token,
                          authContext.uid,
                          productId
                        );
                        userDataContext.deleteCartProduct(productId);
                      } catch (error) {
                        console.log(error.message);
                      }
                    };
                    deleteHandler();
                  }}
                  onChangeQuantity={(product) => {
                    /*
                      Function change product quantity from user cart include
                      - Change in database
                      - Change in context
                    */
                    const onUpdate = async () => {
                      try {
                        await updateCartProductQuantity(
                          authContext.token,
                          authContext.uid,
                          product.productId,
                          product.quantity
                        );
                        userDataContext.updateCartProduct(product);
                      } catch (error) {
                        console.log(error.message);
                      }
                    };
                    onUpdate();
                  }}
                  isCartItem
                  data={itemData.item}
                />
              );
            }}
          />
        </View>
      </View>

      {/* Coupon */}
      <View style={[styles.partContainer, { marginTop: 8 }]}>
        <View style={{ flexDirection: "row" }}>
          <Input
            inputOptions={{
              value: couponCode,
              onChangeText: (enteredText) => {
                setCouponCode(enteredText);
              },
            }}
            placeHolder={"Enter Coupon Code"}
            style={{ flex: 4 }}
          />
          <PrimaryButton
            onPress={async () => {
              /*
                Function check user coupon
              */
              Keyboard.dismiss();
              const coupons = await getCouponByCode(
                authContext.token,
                couponCode
              );

              if (coupons.length != 0) {
                setOffer(coupons[0].offer);
              } else {
                setOffer(0.0);
              }
            }}
            style={{ flex: 1, paddingVertical: 8 }}
          >
            Apply
          </PrimaryButton>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.partContainer}>
        <Text style={styles.title}>Payment Details</Text>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Item(
              {userDataContext.cartProducts.reduce(
                (total, next) => total + next.quantity,
                0
              )}
              )
            </Text>
            <Text style={styles.value}>
              $
              {userDataContext.cartProducts
                .reduce((total, next) => total + next.quantity * next.price, 0)
                .toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping</Text>
            <Text style={styles.value}>$0.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Coupon</Text>
            <Text style={[styles.value, { color: Colors.Primary_Red }]}>
              -{offer * 100}% $
              {(
                userDataContext.cartProducts.reduce(
                  (total, next) => total + next.quantity * next.price,
                  0
                ) * offer
              ).toFixed(2)}
            </Text>
          </View>
          <DashedLine color={Colors.Neutral_Dark} />
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                { color: Colors.Neutral_Dark, fontWeight: "bold" },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.value,
                { color: Colors.Primary_Blue, fontWeight: "bold" },
              ]}
            >
              $
              {(
                userDataContext.cartProducts.reduce(
                  (total, next) => total + next.quantity * next.price,
                  0
                ) *
                (1 - offer)
              ).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Checkout */}
      <PrimaryButton
        style={{ marginBottom: 4, marginHorizontal: 8 }}
        onPress={() => {
          userDataContext.cartProducts.length > 0 &&
            navigation.navigate("AddressScreen", {
              data: {
                products: userDataContext.cartProducts,
                price: userDataContext.cartProducts
                  .reduce(
                    (total, next) => total + next.quantity * next.price,
                    0
                  )
                  .toFixed(2),
                items: userDataContext.cartProducts.reduce(
                  (total, next) => total + next.quantity,
                  0
                ),
                shipping: 0.0,
                coupon: offer,
              },
            });
        }}
      >
        Check Out
      </PrimaryButton>
    </View>
  );
}

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },

  partContainer: {
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },

  content: {
    borderWidth: 1,
    borderColor: Colors.Neutral_Grey,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 4,
  },
});
