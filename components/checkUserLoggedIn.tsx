import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    return token !== null;
    
  } catch (e) {
    console.error("Failed to load user token", e);
    return false;
  }
};
