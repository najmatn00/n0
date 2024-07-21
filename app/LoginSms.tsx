import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
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
    Alert.alert("Successful", JSON.stringify(data));
    await AsyncStorage.setItem("token", "najmeh");
    replace("Welcom");
  };
  return (
    <View>
      <SafeAreaView className="w-full h-full  bg-white justify-center  border-white space-y-6">
        <View className="  w-full space-y-6 mb-8">
          <Text className=" text-[30px] font-bold text-[#1F41BB] text-center ">
            وارد شو
          </Text>
          <Text className=" text-[20px] text-center font-bold ">
            خوش آمدید به اپلیکیشن ما
          </Text>
        </View>
        <Controller
          control={control}
          name="Code"
          render={({ field: { value, onChange, onBlur } }) => (
            <View>
              <TextInput
                className={`border-2 text-black bg-[#F1F4FF] px-4 py-2 rounded-lg text-lg text-right mx-16 ${
                  isFocused ? "border-[#1F41BB]" : "border-slate-300"
                }`}
                placeholder="کد تایید"
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
            <Button
              title="تایید"
              onPress={handleSubmit(onSubmit)}
              color={"#1F41BB"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
