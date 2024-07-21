import React, { useState } from "react";
import { Alert, View } from "react-native";
import { ListItem } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileChildren() {
  const [expanded, setExpanded] = useState(false); // اضافه کردن حالت (state) برای کنترل باز و بسته شدن آکاردئون

  const list2 = [
    {
      name: "20 استوری + 5 پست ماهانه",
      price: "10 هزار تومان",
    },
    {
      name: "30 استوری + 10 پست دوماهه",
      price: "15 هزار تومان",
    },
  ];

  // تابعی برای ذخیره اطلاعات آیتم در AsyncStorage
  const log = async (item: any) => {
    console.log("Item pressed:", item);
    try {
      // ذخیره اطلاعات انتخاب شده به صورت رشته‌ای در AsyncStorage
      await AsyncStorage.setItem("selectedItem", JSON.stringify(item));
      Alert.alert("Success", "Item saved successfully!");
    } catch (error) {
      console.error("Error saving item", error);
      Alert.alert("Error", "Failed to save item.");
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <ListItem.Accordion
        content={
          <View className="w-full">
            <ListItem.Content className="">
              <ListItem.Title className=" w-full">پکیج های ما</ListItem.Title>
            </ListItem.Content>
          </View>
        }
        isExpanded={expanded} // استفاده از حالت expanded برای کنترل باز و بسته شدن آکاردئون
        onPress={() => {
          setExpanded(!expanded); // تغییر وضعیت باز و بسته شدن آکاردئون با کلیک
        }}
      >
        {list2.map((l, i) => (
          <ListItem
            key={i}
            onPress={() => log(l)} // ارسال اطلاعات آیتم به تابع log برای ذخیره‌سازی
            bottomDivider
          >
            <ListItem.Content className="">
              <ListItem.Title className=" w-full text-right ">
                {l.name}
              </ListItem.Title>
              <ListItem.Subtitle className=" w-full text-right">
                {l.price}
              </ListItem.Subtitle>
            </ListItem.Content>
            {/* <ListItem.Chevron /> */}
          </ListItem>
        ))}
      </ListItem.Accordion>
    </View>
  );
}
