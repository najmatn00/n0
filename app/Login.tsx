import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
// import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

const formSchema = z.object({
  Phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
});

const Login = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      Phone: "",
    },
    resolver: zodResolver(formSchema), // Assuming zodResolver is defined elsewhere
  });
  const { replace } = useRouter();
  const onSubmit = async (data: any) => {
    Alert.alert("Successful", JSON.stringify(data));
    await AsyncStorage.setItem("token", "najmeh");
    await AsyncStorage.setItem("phone", data.Phone); //save in AsyncStorage
    SetPhone(data.Phone); //save in  state for Show phone
    replace("LoginSms");
  };
  const [phone, SetPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  return (
    <SafeAreaView className="">
      <Image
        className=" justify-center border w-full mt-8"
        source={require("../assets/images/head.png")}
      ></Image>
      <View className="w-full h-[78vh]   justify-center  border-white space-y-6">
        <View className="  w-full space-y-6 ">
          <Text
            style={styles.fontE}
            className=" text-[40px]  text-[#005C78] mr-10 "
          >
            ورود
          </Text>
          <Text
            style={styles.fontReg}
            className=" text-[18px] mr-10 text-[#9796A1] "
          >
            شماره شما
          </Text>
        </View>
        <Controller
          control={control}
          name="Phone"
          render={({ field: { value, onChange, onBlur } }) => (
            <View>
              <TextInput
                className={`border-2 text-black bg-[#F1F4FF] px-4 py-2 rounded-lg text-lg text-right mx-10 ${
                  isFocused ? "border-[#1F41BB]" : "border-[#EEEEEE]"
                }`}
                // placeholder="شماره تلفن"
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                  setIsFocused(false);
                }}
                onFocus={() => setIsFocused(true)}
                placeholderTextColor={"#494949"}
              />
              {formState.errors.Phone && (
                <Text
                  style={{ color: "red", textAlign: "center", marginTop: 6 }}
                >
                  {formState.errors.Phone.message}
                </Text>
              )}
            </View>
          )}
        />
        <View className="w-full ">
          <View className=" mx-16 rounded-2xl text-[28px] ">
            {/* <Button
              title="ورود"
              onPress={handleSubmit(onSubmit)}
              color={"#E88D67"}
            /> */}
            <TouchableOpacity className="" onPress={handleSubmit(onSubmit)}>
              <Text
                style={styles.fontE}
                className="bg-[#E88D67] text-[28px] py-2 rounded-3xl text-center text-white "
              >
                ورود
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View className="flex flex-row-reverse mr-16 gap-1 items-center  w-full justify-center">
          <Text
            style={styles.fontS}
            className=" text-[14px] text-[#5B5B5E] font-semibold "
          >
            حساب کاربری ندارید؟
          </Text>
          <Link href={"/SignUp"}>
            <Text
              style={styles.fontE}
              className="  text-[16px] text-[#005C78] "
            >
              ثبت نام
            </Text>
          </Link>
        </View> */}
      </View>
      <Image
        className="border w-full  "
        source={require("../assets/images/footer.png")}
      ></Image>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fontE: {
    fontFamily: "Extra",
  },
  fontS: {
    fontFamily: "semi",
  },
  fontReg: {
    fontFamily: "reg",
  },
  bt: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default Login;
