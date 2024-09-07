import {
  BackHandler,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/styles";
import { useEffect, useRef, useState } from "react";

function Input({
  leftIcon,
  placeHolder,
  style,
  isError,
  errorText,
  inputOptions,
  iconColor,
  onPress,
  rightIcon,
  onEdit,
}) {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Perform your actions here
        inputRef.current?.blur();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Pressable onPress={onPress} style={[styles.outerContainer, style]}>
      <View
        style={[
          styles.innerContainer,
          isFocus && styles.focused,
          isError && styles.error,
        ]}
      >
        {!!leftIcon && (
          <Ionicons
            style={styles.icon}
            name={leftIcon}
            color={
              isError
                ? Colors.Primary_Red
                : !isFocus
                ? !!iconColor
                  ? iconColor
                  : Colors.Neutral_Grey
                : Colors.Primary_Blue
            }
            size={24}
          />
        )}
        <TextInput
          ref={inputRef}
          onPress={onPress}
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor={Colors.Neutral_Grey}
          onFocus={() => {
            setIsFocus(true);
            !!onEdit && onEdit(true);
          }}
          onBlur={() => {
            setIsFocus(false);
            !!onEdit && onEdit(false);
          }}
          {...inputOptions}
        />

        {!!rightIcon && rightIcon}
      </View>
      {isError && !!errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </Pressable>
  );
}

export default Input;

const styles = StyleSheet.create({
  outerContainer: { alignItems: "flex-start" },
  innerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.Neutral_Light,
    borderRadius: 5,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: Colors.Neutral_Grey,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  focused: {
    borderColor: Colors.Primary_Blue,
  },
  error: {
    borderColor: Colors.Primary_Red,
  },
  errorText: {
    fontSize: 16,
    color: Colors.Primary_Red,
    fontWeight: "bold",
    marginTop: 4,
  },
});
