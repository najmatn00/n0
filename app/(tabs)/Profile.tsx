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
      <Image className=" w-full" source={require("../../assets/images/headP.png")}></Image>
       <View className="bg-[#E88D67] w-32 h-32 rounded-full justify-center absolute top-24 left-[33%]  ">
         <Image
          className=" justify-center absolute -top-11 left-[7%] "
          source={require("../../assets/images/p.png")}
        ></Image>
      </View>
      <View className=" w-full h-full items-center mt-20 space-y-10 relative ">
        <View className=" space-y-2">
          <Text className=" font-bold text-base text-[#9796A1]">شماره تلفن</Text>
          <Text className=" text-[#111719] font-semibold border-[#EEEEEE] border-2 py-2 pr-44 pl-2 rounded-lg text-right">
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
            <TouchableOpacity className="">
              <Text className="bg-[#E88D67] text-[28px] py-2 rounded-3xl text-center text-white">
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
