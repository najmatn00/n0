import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileChildren from "../profileChildren";

function Profile() {
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      const storedPhone:any = await AsyncStorage.getItem("phone");
      setPhone(storedPhone);
    };
    fetchPhoneNumber();
  }, []);
  return (
    <SafeAreaView className=" w-full h-full">
      <View className=" w-full h-full items-center mt-20 space-y-10">
        <Image
          className=" justify-center border w-36 h-36"
          source={require("../../assets/images/a.png")}
        ></Image>
        <View className=" space-y-2">
          <Text className=" font-bold text-base">شماره تلفن</Text>
          <Text className=" text-black font-semibold border-[#1F41BB] border-2 py-2 pr-44 pl-2 rounded-lg text-right">
            {phone}
          </Text>
        </View>
        <View
          className="border w-[68%] rounded-lg
        "
        >
          <ProfileChildren></ProfileChildren>
        </View>
        <View className="w-full ">
          <View className=" mx-16 rounded-2xl  ">
            <TouchableOpacity className="bg-[#1F41BB] py-2 rounded-lg">
              <Text className="text-center text-white font-semibold text-base">
                ثبت تغییرات
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
