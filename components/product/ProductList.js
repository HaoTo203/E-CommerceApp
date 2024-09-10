import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "./ProductItem";

function ProductList({
  items,
  listOptions,
  style,
  itemOptions,
  onRemoveProductPress,
}) {
  const navigation = useNavigation();
  function renderProductItem(itemData) {
    const item = itemData.item;
    return (
      <ProductItem
        data={item}
        itemOptions={!!itemOptions ? itemOptions : null}
        onPress={() => {
          navigation.push("ProductDetailScreen", {
            productData: { ...itemData.item },
          });
        }}
        onRemovePress={() => {
          !!onRemoveProductPress ? onRemoveProductPress(item.productId) : null;
        }}
      />
    );
  }
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={renderProductItem}
        {...listOptions}
      ></FlatList>
    </View>
  );
}

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
