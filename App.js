import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./constants/styles";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import AccountScreen from "./screens/Account/AccountScreen";
import { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ContentScreen from "./screens/ContentScreen";
import FavoriteProductScreen from "./screens/FavoriteProductScreen";
import ProductDetailScreen from "./screens/Product/ProductDetailScreen";
import ReviewScreen from "./screens/ReviewScreen";
import WriteReviewScreen from "./screens/WriteReviewScreen";
import NotificationScreen from "./screens/Notification/NotificationScreen";
import NotificationDetailScreen from "./screens/Notification/NotificationDetailScreen";
import SearchScreen from "./screens/Search/SearchScreen";
import ProfileScreen from "./screens/Account/ProfileScreen";
import ChangeProfileScreen from "./screens/Account/ChangeProfileScreen";
import OrderScreen from "./screens/Account/OrderScreen";
import OrderDetailScreen from "./screens/Account/OrderDetailScreen";
import AddressScreen from "./screens/Account/AddressScreen";
import AddressFormScreen from "./screens/Account/AdressFormScreen";
import PaymentScreen from "./screens/Account/PaymentScreen";
import CardScreen from "./screens/Account/CardScreen";
import CardFormScreen from "./screens/Account/CardFormScreen";
import SuccessScreen from "./screens/SuccessScreen";
import SearchResultScreen from "./screens/Search/SearchResultScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import ForgotPasswordScreen from "./screens/ResetAccount/ForgotPasswordScreen";
import VerificationScreen from "./screens/ResetAccount/VerificationScreen";
import ResetPasswordScreen from "./screens/ResetAccount/ResetPasswordScreen";
import * as SplashScreen from "expo-splash-screen";
import UserDataContextProvider, {
  UserDataContext,
} from "./store/user-data-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: Colors.Background_White },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignupScreen"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTintColor: Colors.Neutral_Grey,
          headerShadowVisible: false,
        }}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTintColor: Colors.Neutral_Grey,
          headerShadowVisible: false,
        }}
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTintColor: Colors.Neutral_Grey,
          headerShadowVisible: false,
        }}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { color: Colors.Neutral_Dark },
        headerTintColor: Colors.Neutral_Grey,
        contentStyle: { backgroundColor: Colors.Background_White },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTab"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        options={{ headerShown: true }}
        name="ContentScreen"
        component={ContentScreen}
      />
      <Stack.Screen
        options={{ headerShown: true, title: "Favorite Product" }}
        name="FavoriteProductScreen"
        component={FavoriteProductScreen}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        options={{ title: "Reviews" }}
        name="ReviewScreen"
        component={ReviewScreen}
      />
      <Stack.Screen
        options={{ title: "Write Review" }}
        name="WriteReviewScreen"
        component={WriteReviewScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen
        name="NotificationDetailScreen"
        component={NotificationDetailScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        options={{ title: "My Profile" }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="ChangeProfileScreen"
        component={ChangeProfileScreen}
      />
      <Stack.Screen
        options={{ title: "My Order" }}
        name="OrderScreen"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{ title: "Order Details" }}
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <Stack.Screen
        options={{ title: "My Address" }}
        name="AddressScreen"
        component={AddressScreen}
      />
      <Stack.Screen name="AddressFormScreen" component={AddressFormScreen} />
      <Stack.Screen
        options={{ title: "Payment Method" }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{ title: "Card" }}
        name="CardScreen"
        component={CardScreen}
      />
      <Stack.Screen name="CardFormScreen" component={CardFormScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route, navigation }) => {
        return {
          tabBarStyle: {
            backgroundColor: Colors.Background_White,
            height: "10%",
            paddingTop: "4%",
            paddingBottom: "4%",
          },
          tabBarActiveTintColor: Colors.Primary_Blue,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: navigation.isFocused() ? "bold" : "regular",
          },
        };
      }}
      sceneContainerStyle={{ backgroundColor: Colors.Background_White }}
    >
      <BottomTab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: "Home",
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
          title: "Your Cart",
        }}
        name="CartScreen"
        component={CartScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          title: "Account",
        }}
        name="AccountScreen"
        component={AccountScreen}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {!authContext.isAuthenticated && <AuthStack />}
        {authContext.isAuthenticated && <AuthenticatedStack />}
      </SafeAreaView>
    </NavigationContainer>
  );
}

function Root() {
  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);

  useEffect(() => {
    async function featchToken() {
      await SplashScreen.preventAutoHideAsync();
      const storedToken = await AsyncStorage.getItem("token");
      const storedUid = await AsyncStorage.getItem("uid");
      const storedDate = new Date(await AsyncStorage.getItem("loginTime"));
      const timeRemaining = 60 * 60 * 1000 - (new Date() - storedDate);
      if (timeRemaining > 0) {
        setTimeout(() => {
          Alert.alert("Connection Timeout", "Please, SignIn!");
          authContext.logout();
          userDataContext.deleteData();
        }, timeRemaining);
        if (storedToken && storedUid) {
          authContext.authenticate({
            token: storedToken,
            uid: storedUid,
            loginTime: storedDate,
          });
        }
      }
      await SplashScreen.hideAsync();
    }
    featchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <UserDataContextProvider>
          <Root />
        </UserDataContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
