import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkUserLoggedIn = async () => {
  try {
    const token = toragawait AsyncSe.getItem("Token");
    return token !== null;
  } catch (e) {
    console.error("Failed to load user token", e);
    return false;
  }
};
