import { Image, Platform } from "react-native";
import { View, Text } from "react-native";
import { Link } from "expo-router";

import { StyleSheet } from "react-native";
export default function HomeScreen() {
  return (
    <View>
      <Link style={styles.link} href="/Login">
        Login
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    color: "red",
  },
});
