import {
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "../../constants/styles";
import ListItem from "../../components/ui/list/ListItem";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/ui/IconButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { profileSection } from "../../constants/data";
import { fetchUserProfile, updateUserProfile } from "../../util/http";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { getFormattedDate } from "../../util/date";
import { UserDataContext } from "../../store/user-data-context";
import { launchCameraAsync } from "expo-image-picker";

function ProfileScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState();
  const authContext = useContext(AuthContext);
  const userDataContext = useContext(UserDataContext);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const profile = await fetchUserProfile(
          authContext.token,
          authContext.uid
        );
        userDataContext.changeProfile(profile);
        setAvatar(profile.imageUri);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  async function pickImageHandler() {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    try {
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      console.log(image.assets[0]);
      setAvatar(image.assets[0].uri);
      const profile = userDataContext.profile;
      profile.imageUri = image.assets[0].uri;
      await updateUserProfile(authContext.token, authContext.uid, profile);
      userDataContext.changeProfile(profile);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message={""} />;
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        {/* <View
          style={{
            marginTop: "auto",
            backgroundColor: "blue",
          }}
        >
          <View style={styles.footer}>
            <Text style={styles.headerText}>This is Half Modal</Text>
          </View>
        </View> */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          activeOpacity={1}
          onPressOut={() => {
            setIsModalVisible(false);
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                marginTop: "auto",
                paddingTop: 10,
                backgroundColor: Colors.Background_White,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden",
              }}
            >
              <ListItem
                onPress={() => {
                  setIsModalVisible(false);
                  pickImageHandler();
                }}
                leftIcon={
                  <Ionicons
                    style={styles.icon}
                    name="camera-outline"
                    size={28}
                    color={Colors.Primary_Blue}
                  />
                }
                title="Take Picture"
              />
              <ListItem
                leftIcon={
                  <Ionicons
                    style={styles.icon}
                    name="image-outline"
                    size={28}
                    color={Colors.Primary_Blue}
                  />
                }
                title="Open Photo"
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              style={styles.profileImage}
              source={
                !!avatar
                  ? { uri: avatar }
                  : require("../../assets/images/ProfilePicture.png")
              }
            />
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
              }}
              style={styles.imagePicker}
            >
              <Ionicons
                name="camera-outline"
                size={24}
                color={Colors.Primary_Blue}
              />
            </Pressable>
          </View>
          <View style={styles.nameContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.name}>
                {userDataContext.profile.name.firstName}{" "}
                {userDataContext.profile.name.lastName}
              </Text>
              <IconButton
                onPress={() => {
                  navigation.navigate("ChangeProfileScreen", {
                    type: "Name",
                  });
                }}
                style={{ padding: 4, borderWidth: 0, marginHorizontal: 8 }}
                icon={
                  <Ionicons
                    name="pencil-outline"
                    size={20}
                    color={Colors.Neutral_Grey}
                  />
                }
              />
            </View>
          </View>
        </View>
      </View>

      {/* Email */}
      <ListItem
        onPress={() => {
          navigation.navigate("ChangeProfileScreen", {
            type: "Email",
          });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="mail-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Email"
        rightIcon={
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
              {userDataContext.profile.email}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={Colors.Neutral_Grey}
            />
          </View>
        }
      />

      {/* Birthday */}
      <ListItem
        onPress={() => {
          navigation.navigate("ChangeProfileScreen", {
            type: "Birthday",
          });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="calendar-clear-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Birthday"
        rightIcon={
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
              {!!userDataContext.profile.birthday &&
                getFormattedDate(new Date(userDataContext.profile.birthday))}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={Colors.Neutral_Grey}
            />
          </View>
        }
      />

      {/* Gender */}
      <ListItem
        onPress={() => {
          navigation.navigate("ChangeProfileScreen", {
            type: "Gender",
          });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="female-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Gender"
        rightIcon={
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
              {userDataContext.profile.gender}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={Colors.Neutral_Grey}
            />
          </View>
        }
      />

      {/* Phone Number */}
      <ListItem
        onPress={() => {
          navigation.navigate("ChangeProfileScreen", {
            type: "Phone Number",
          });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="phone-portrait-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Phone Number"
        rightIcon={
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.content} ellipsizeMode="tail" numberOfLines={1}>
              {userDataContext.profile.phoneNumber}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={Colors.Neutral_Grey}
            />
          </View>
        }
      />

      {/* Change Password */}
      <ListItem
        onPress={() => {
          navigation.navigate("ChangeProfileScreen", {
            type: "Change Password",
          });
        }}
        leftIcon={
          <Ionicons
            style={styles.icon}
            name="lock-closed-outline"
            size={28}
            color={Colors.Primary_Blue}
          />
        }
        title="Change Password"
        rightIcon={
          <View style={{ flexDirection: "row" }}>
            <Text
              style={styles.content}
              ellipsizeMode="tail"
              numberOfLines={1}
            ></Text>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={Colors.Neutral_Grey}
            />
          </View>
        }
      />

      <View style={{ flex: 1 }}></View>
      <IconButton
        onPress={() => {
          authContext.logout();
          userDataContext.deleteData();
        }}
        style={{ margin: 16 }}
      >
        Logout
      </IconButton>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  userContainer: {
    flexDirection: "row",
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: Colors.Neutral_Grey,
  },
  imagePicker: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: Colors.Background_White,
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.Neutral_Grey,
  },
  nameContainer: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginHorizontal: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
  },
  tag: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.Neutral_Dark,
    marginHorizontal: 16,
  },
  content: {
    fontSize: 16,
    color: Colors.Neutral_Grey,
    marginHorizontal: 4,
    width: 150,
    textAlign: "right",
  },
});
