import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { cc_format } from "../../util/DataConverter";
import Card from "../../components/card/Card";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { addOrder, deleteCart, fetchUserCard } from "../../util/http";

const dummyData = [
  {
    id: 1,
    cardNumber: "6326912481249875",
    expireDate: "12/12",
    securityCode: "1212",
    cardHolder: "Lailyfa Febrina",
  },
  {
    id: 2,
    cardNumber: "6326912481249875",
    expireDate: "12/23",
    securityCode: "1212",
    cardHolder: "Lailyfa Febrina",
  },
  {
    id: 3,
    cardNumber: "6326912481249875",
    expireDate: "12/23",
    securityCode: "1212",
    cardHolder: "Lailyfa Febrina",
  },
  {
    id: 4,
    cardNumber: "6326912481249875",
    expireDate: "12/23",
    securityCode: "1212",
    cardHolder: "Lailyfa Febrina",
  },
];
function CardScreen({ route, navigation }) {
  const [selectedCard, setSelectedCard] = useState({});
  const [allCards, setAllCards] = useState(null);
  const authContext = useContext(AuthContext);
  const data = route.params?.data;

  useEffect(() => {
    async function getCard() {
      try {
        const card = await fetchUserCard(authContext.token, authContext.uid);
        setAllCards(card);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCard();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={allCards}
        keyExtractor={(item) => item.cardId}
        renderItem={(itemData) => {
          return (
            <Card
              style={
                selectedCard.cardId == itemData.item.cardId && {
                  backgroundColor: Colors.Primary_Blue,
                }
              }
              onPress={() => {
                !!data
                  ? setSelectedCard(itemData.item)
                  : navigation.navigate("CardFormScreen", {
                      type: "Edit",
                      cardInfo: itemData.item,
                    });
              }}
              cardInfo={itemData.item}
            />
          );
        }}
      />
      <PrimaryButton
        onPress={() => {
          if (!!data) {
            // TODO: do something about payment ...
            const uploadData = async () => {
              const orderId = await addOrder(authContext.token, {
                ...data,
                userId: authContext.uid,
                status: 0,
                date: new Date(),
              });
              await deleteCart(authContext.token, authContext.uid);
            };
            uploadData();
            navigation.navigate("SuccessScreen");
          } else {
            navigation.navigate("CardFormScreen", { type: "Add" });
          }
        }}
        style={{ margin: 8 }}
      >
        {!!data ? "Finish" : "Add Card"}
      </PrimaryButton>
    </View>
  );
}

export default CardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
});
