import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const route = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkUserLoggedIn();
      if (!loggedIn) {
        // console.log("check");
        route.replace("/Login");
      }
    };
    checkLoginStatus();
  }, []);
  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    route.replace("/Login");
  };
  return (
    <SafeAreaView>
      <Link href={"/home"}>go home</Link>
      <Text>salam</Text>
      <Button title="log out" onPress={logOut} />
    </SafeAreaView>
  );
};

export default App;
