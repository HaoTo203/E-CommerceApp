import { Animated, FlatList, StyleSheet, View } from "react-native";
import SlideItem from "./SlideItem";
import { useRef, useState } from "react";
import Paginator from "./Paginator";

function ImageSlider({ src }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <FlatList
        data={src}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <SlideItem imageUri={itemData.item.imageUri} />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      ></FlatList>
      <View style={{ marginTop: 16 }}>
        <Paginator data={src} scrollX={scrollX} />
      </View>
    </View>
  );
}

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
