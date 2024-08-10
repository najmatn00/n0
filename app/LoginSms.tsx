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
  TouchableOpacity,
} from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
const formSchema = z.object({
  // TODO: fix schema
  Code: z.string().min(4, { message: "Must be a valid Code" }),
});
export default function LoginSms() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      Code: "",
    },
    resolver: zodResolver(formSchema), // Assuming zodResolver is defined elsewhere
  });
  const [isFocused, setIsFocused] = useState(false);
  const { replace } = useRouter();
  const onSubmit = async (data: any) => {
    // Alert.alert("Successful", JSON.stringify(data));
    await AsyncStorage.setItem("token", "najmeh");
    replace("/Welcom");
  };
  return (
    <View>
      <SafeAreaView className="">
        <Image
          className=" justify-center border w-full mt-8"
          source={require("../assets/images/head.png")}
        ></Image>
        <View className=" justify-center w-full  items-center">
          <Image
            className=" w-72 h-72"
            source={require("../assets/gift/instaN.gif")}
          ></Image>
        </View>
        <View className="w-full h-[40vh] mt-4  justify-center  border-white space-y-6">
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
              {" "}
              کد تایید شما
            </Text>
          </View>
          <Controller
            control={control}
            name="Code"
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <TextInput
                  className={`border-2 text-black bg-[#F1F4FF] px-4 py-2 rounded-lg text-lg text-right mx-10 ${
                    isFocused ? "border-[#1F41BB]" : "border-[#EEEEEE]"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                  onFocus={() => setIsFocused(true)}
                  placeholderTextColor={"#494949"}
                />
                {formState.errors.Code && (
                  <Text
                    style={{ color: "red", textAlign: "center", marginTop: 6 }}
                  >
                    {formState.errors.Code.message}
                  </Text>
                )}
              </View>
            )}
          />
          <View className="w-full ">
            <View className=" mx-16 rounded-2xl  ">
              {/* <Button
                title="تایید"
                onPress={handleSubmit(onSubmit)}
                color={"#1F41BB"}
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
        </View>
        <Image
          className="border w-full  "
          source={require("../assets/images/footer.png")}
        ></Image>
      </SafeAreaView>
    </View>
  );
}
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
