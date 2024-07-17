import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeIndex = () => {
    const route =useRouter()
    useEffect(() => {
      const checkLoginStatus = async () => {
        const loggedIn = await checkUserLoggedIn();
        if (!loggedIn) {
          console.log("check");
          route.replace("/login")
        }
      };
      checkLoginStatus();
    }, []);

    return ( 
        <SafeAreaView>
            <Link href={"/login"}>go login</Link>
            <Text>salam</Text>
        </SafeAreaView>
     );
}
 
export default HomeIndex;