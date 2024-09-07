import { FlatList, StyleSheet, View } from "react-native";
import CategoryItem from "./CategoryItem";

function CategoryList({ items, listOptions, style, onItemPress }) {
  function renderCategoryItem(itemData) {
    const item = itemData.item;
    return <CategoryItem data={item} onPress={onItemPress} />;
  }
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.categoryId}
        renderItem={renderCategoryItem}
        {...listOptions}
      ></FlatList>
    </View>
  );
}

export default CategoryList;

const styles = StyleSheet.create({
  container: {},
});
