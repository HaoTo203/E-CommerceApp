import { FlatList, Pressable, Text } from "react-native";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function RecommendForm({ data }) {
  const navigation = useNavigation();

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(dataItem) => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("SearchResultScreen", {
                search: dataItem.item.text,
              });
            }}
            style={({ pressed }) => [
              { padding: 16 },
              pressed && { backgroundColor: Colors.Neutral_Light },
            ]}
          >
            <Text style={{ fontSize: 16, color: Colors.Neutral_Grey }}>
              {dataItem.item.text}
            </Text>
          </Pressable>
        );
      }}
    ></FlatList>
  );
}

export default RecommendForm;
