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
import { Calendar } from "react-native-calendars";
import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// آرایه‌ای از داده‌های استوری‌های پیشنهادی
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
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    route.replace("/Login");
  };

  // تعریف دو حالت (state) یکی برای درصد پیشرفت و دیگری برای آیتم‌های انتخاب‌شده
  const [progress, setProgress] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // // تابعی برای مدیریت کلیک روی آیتم‌ها
  const handleItemPress = (id: string) => {
    // کپی از آرایه آیتم‌های انتخاب‌شده
    let updatedSelectedItems = [...selectedItems];
    // بررسی اینکه آیا آیتم قبلاً انتخاب شده است یا نه
    if (updatedSelectedItems.includes(id)) {
      // اگر آیتم قبلاً انتخاب شده بود، آن را از آرایه حذف می‌کنیم
      updatedSelectedItems = updatedSelectedItems.filter((item) => item !== id);
    } else {
      // در غیر اینصورت، آیتم را به آرایه اضافه می‌کنیم
      updatedSelectedItems.push(id);
    }
    // به‌روزرسانی حالت آیتم‌های انتخاب‌شده
    setSelectedItems(updatedSelectedItems);
    // به‌روزرسانی درصد پیشرفت بر اساس تعداد آیتم‌های انتخاب‌شده
    setProgress((updatedSelectedItems.length / data.length) * 100);
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
        {/* <View style={styles.dateContainer}>
          <Icon name="calendar" size={20} color="#333" />
          <Text style={styles.date}>{getPersianDate(selectedDate)}</Text>
       </View> */}
        <Image
          className=" rounded-full bg-[#E88D67]  absolute -top-2 left-10"
          source={require("../../assets/images/profile.png")}
        ></Image>
        {/* <Text style={styles.date}>۱۴۰۳ آبان</Text> */}
        {/* <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: 'orange',
        }}
      /> */}
      </View>
      <View className="px-10">
        {/* عنوان استوری‌های پیشنهادی */}
        <Text className=" text-[#005C78] text-[22px] font-bold text-center mt-6">
          استوری های پیشنهادی امروز
        </Text>
        {/* نمایش نمودار پیشرفت */}
        <View className=" items-center my-6">
          <CircularProgress
            value={progress} // درصد پیشرفت
            radius={80} // شعاع دایره
            activeStrokeWidth={15} // ضخامت نوار فعال
            inActiveStrokeWidth={15} // ضخامت نوار غیر فعال
            progressValueColor="#006989" // رنگ مقدار پیشرفت
            inActiveStrokeColor="#EFEFEF" // رنگ نوار غیر فعال
            activeStrokeColor="#E88D67" // رنگ نوار فعال
          />
        </View>
        {/* لیست استوری‌های پیشنهادی */}
        <FlatList
          data={data} // داده‌های لیست
          keyExtractor={(item) => item.id} // استخراج کلید هر آیتم
          renderItem={({ item }) => (
            // آیتم لیست با قابلیت کلیک
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
              <View style={styles.storyItem}>
                {/* متن استوری */}
                <Text style={styles.storyText}>{item.text}</Text>
                {/* آیکون چک‌باکس */}
                <Icon
                  name={
                    selectedItems.includes(item.id)
                      ? "checkbox"
                      : "square-outline"
                  } // انتخاب آیکون بر اساس وضعیت انتخاب‌شده
                  size={20}
                  color={
                    selectedItems.includes(item.id) ? "#006989" : "#006989"
                  } // رنگ آیکون بر اساس وضعیت انتخاب‌شده
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 16,
    color: "#333",
  },
  suggestedStoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
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
