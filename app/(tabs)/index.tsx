import { Image, Platform, SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView className=" mt-14 mx-4">
  
        <Link className="text-white text-lg" href="/../Login">
          Login
        </Link>

    </SafeAreaView> 
  );
}
;
