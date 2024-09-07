import { Alert, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Input from "../../components/ui/Input";
import { Colors } from "../../constants/styles";
import Card from "../../components/card/Card";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { addUserCard, deleteUserCard, updateUserCard } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import IconButton from "../../components/ui/IconButton";
function CardFormScreen({ route, navigation }) {
  const [enteredCardNumber, setEnteredCardNumber] = useState("");
  const [enteredExpiryDate, setEnteredExpiryDate] = useState("");
  const [enteredCVV, setEnteredCVV] = useState("");
  const [enteredCardHolder, setEnteredCardHolder] = useState("");
  const authContext = useContext(AuthContext);
  const formType = route.params.type;
  const cardInfo = route.params?.cardInfo;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: formType + " Card",
    });
  }, [navigation]);

  useEffect(() => {
    if (formType === "Edit") {
      setEnteredCardHolder(cardInfo.cardHolder);
      setEnteredExpiryDate(cardInfo.expiryDate);
      setEnteredCardNumber(cardInfo.cardNumber);
      setEnteredCVV(cardInfo.cvv);
    }
  }, []);

  function submitHandler() {
    const cardNumberIsValid = enteredCardNumber.length === 16;
    const expiryDateIsValid = enteredExpiryDate.length === 5;
    const CVVIsValid = enteredCVV.length === 3;
    const cardHolderIsValid = enteredCardHolder.length != 0;

    if (
      !cardNumberIsValid ||
      !expiryDateIsValid ||
      !CVVIsValid ||
      !cardHolderIsValid
    ) {
      Alert.alert("Incorrect Card!", "Please, Try again!");
      return;
    }

    if (formType === "Add") {
      const uploadData = async () => {
        try {
          await addUserCard(authContext.token, authContext.uid, {
            cvv: enteredCVV,
            cardNumber: enteredCardNumber,
            expiryDate: enteredExpiryDate,
            cardHolder: enteredCardHolder,
          });

          ToastAndroid.showWithGravity(
            `New card has been add`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.goBack();
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadData();
      return;
    }

    if (formType === "Edit") {
      const uploadData = async () => {
        try {
          await updateUserCard(
            authContext.token,
            authContext.uid,
            cardInfo.cardId,
            {
              ccv: enteredCVV,
              cardNumber: enteredCardNumber,
              expiryDate: enteredExpiryDate,
              cardHolder: enteredCardHolder,
            }
          );

          ToastAndroid.showWithGravity(
            `Your card has been update`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigation.goBack();
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadData();
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Card
        cardInfo={{
          cardNumber: enteredCardNumber,
          expiryDate: enteredExpiryDate,
          cardHolder: enteredCardHolder,
        }}
      />
      <View style={styles.partContainer}>
        <Text style={styles.title}>Card Number</Text>
        <Input
          placeHolder={"Card Number"}
          style={styles.inputContainer}
          onPress={() => {}}
          inputOptions={{
            value: enteredCardNumber,
            onChangeText: (enteredText) => {
              setEnteredCardNumber(enteredText);
            },
            maxLength: 16,
            keyboardType: "decimal-pad",
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.partContainer, { flex: 1 }]}>
          <Text style={styles.title}>Expiry Date</Text>
          <Input
            placeHolder="MM/YY"
            style={styles.inputContainer}
            onPress={() => {}}
            inputOptions={{
              value: enteredExpiryDate,
              onChangeText: (enteredText) => {
                // Remove non-numeric characters
                const numericText = enteredText.replace(/[^0-9]/g, "");

                // Format the date with slashes as the user types
                let formattedDate = numericText;
                if (formattedDate.length > 2) {
                  formattedDate =
                    formattedDate.substring(0, 2) +
                    "/" +
                    formattedDate.substring(2);
                }
                setEnteredExpiryDate(formattedDate);
              },
              keyboardType: "decimal-pad",
              maxLength: 5,
            }}
          />
        </View>
        <View style={[styles.partContainer, { flex: 1 }]}>
          <Text style={styles.title}>CVV</Text>
          <Input
            placeHolder="CVV"
            style={styles.inputContainer}
            onPress={() => {}}
            inputOptions={{
              value: enteredCVV,
              onChangeText: (enteredText) => {
                setEnteredCVV(enteredText);
              },
              keyboardType: "decimal-pad",
              maxLength: 3,
            }}
          />
        </View>
      </View>
      <View style={styles.partContainer}>
        <Text style={styles.title}>Card Holder</Text>
        <Input
          placeHolder={"Card Holder"}
          style={styles.inputContainer}
          onPress={() => {}}
          inputOptions={{
            value: enteredCardHolder,
            onChangeText: (enteredText) => {
              setEnteredCardHolder(enteredText.toUpperCase());
            },
          }}
        />
      </View>
      <PrimaryButton onPress={submitHandler} style={{ margin: 8 }}>
        {formType == "Add" ? "Add Card" : "Save"}
      </PrimaryButton>
      {formType === "Edit" && (
        <IconButton
          onPress={() => {
            const uploadData = async () => {
              try {
                await deleteUserCard(
                  authContext.token,
                  authContext.uid,
                  cardInfo.cardId
                );

                ToastAndroid.showWithGravity(
                  `Delete card successfully`,
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                );
                navigation.goBack();
              } catch (error) {
                console.log(error.message);
              }
            };
            const response = uploadData();
          }}
          style={{ margin: 8 }}
        >
          Delete
        </IconButton>
      )}
    </View>
  );
}

export default CardFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  partContainer: {
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  inputContainer: {
    marginVertical: 8,
  },
});
