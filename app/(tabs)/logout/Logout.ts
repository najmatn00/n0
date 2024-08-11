import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {} from "expo-router/build/Route";

const LogOut = async () => {
  const route = useRouter();

  await AsyncStorage.removeItem("token");
  route.replace("/Login");
};

export default LogOut;
