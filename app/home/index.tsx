import { SafeAreaView, Text } from "react-native";
import Chat from "../Chat";
import { Link } from "expo-router";
// import { TapsellPlus } from "react-native-tapsell-plus";
const home = () => {
    return ( 
        <SafeAreaView>
            <Text>home</Text>
          <Link className=" text-xl" href={"/Chat"}>go chat</Link>
        </SafeAreaView>
     );
}
 
export default home;