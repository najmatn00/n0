import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CircularProgress from "react-native-circular-progress-indicator";
import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const data = [
  { id: "1", text: "استوری صبح بخیر" },
  { id: "2", text: "استوری عکس محصول به همراه نظرسنجی" },
  { id: "3", text: "استوری تبریک جشن باستانی آبانگان" },
  { id: "4", text: "استوری چالشی به همراه عکس محصول" },
];

const Index = () => {
  const route = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkUserLoggedIn();
      if (!loggedIn) {
        route.replace("/Login");
      }
    };

    checkLoginStatus();
    loadProgressAndItems();  // Load saved progress and items on startup
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    route.replace("/Login");
  };

  const [progress, setProgress] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const saveProgressAndItems = async (updatedSelectedItems: string[], updatedProgress: number) => {
    const currentTime = Date.now();
    await AsyncStorage.setItem("selectedItems", JSON.stringify(updatedSelectedItems));
    await AsyncStorage.setItem("progress", updatedProgress.toString());
    await AsyncStorage.setItem("timestamp", currentTime.toString());
  };

  const loadProgressAndItems = async () => {
    const storedItems = await AsyncStorage.getItem("selectedItems");
    const storedProgress = await AsyncStorage.getItem("progress");
    const storedTimestamp = await AsyncStorage.getItem("timestamp");

    if (storedItems && storedProgress && storedTimestamp) {
      const oneDay = 24 * 60 * 60 * 1000;//یک روز به میلی ثانیه
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(storedTimestamp);

      if (elapsedTime < oneDay) {
        setSelectedItems(JSON.parse(storedItems));
        setProgress(parseFloat(storedProgress));
      } else {
        // If more than a day has passed, clear the data
        await AsyncStorage.removeItem("selectedItems");
        await AsyncStorage.removeItem("progress");
        await AsyncStorage.removeItem("timestamp");
      }
    }
  };

  const handleItemPress = (id: string) => {
    let updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems.includes(id)) {
      updatedSelectedItems = updatedSelectedItems.filter((item) => item !== id);
    } else {
      updatedSelectedItems.push(id);
    }

    const updatedProgress = (updatedSelectedItems.length / data.length) * 100;
    setSelectedItems(updatedSelectedItems);
    setProgress(updatedProgress);

    saveProgressAndItems(updatedSelectedItems, updatedProgress);
  };

  return (
    <SafeAreaView className="pt-8 ">
      <Image
        className="w-full"
        source={require("../../assets/images/headHome.png")}
      ></Image>
      <View className=" absolute top-12 right-6 w-full ">
        <View className="">
          <Text className="text-[#F4F4F4] text-[13px]">چه خبر سمیرا؟</Text>
          <Text className="text-[#CCCCCC] text-[13px]">
            برای یک روز هیجان انگیز آماده‌ای؟
          </Text>
        </View>
        <Image
          className=" rounded-full bg-[#E88D67]  absolute -top-2 left-10"
          source={require("../../assets/images/profile.png")}
        ></Image>
      </View>
      <View className="px-10">
        <Text className=" text-[#005C78] text-[22px] font-bold text-center mt-6">
          استوری های پیشنهادی امروز
        </Text>
        <View className=" items-center my-6">
          <CircularProgress
            value={progress}
            radius={80}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            progressValueColor="#006989"
            inActiveStrokeColor="#EFEFEF"
            activeStrokeColor="#E88D67"
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
              <View style={styles.storyItem}>
                <Text style={styles.storyText}>{item.text}</Text>
                <Icon
                  name={
                    selectedItems.includes(item.id)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={20}
                  color={
                    selectedItems.includes(item.id) ? "#006989" : "#006989"
                  }
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  storyText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default Index;
