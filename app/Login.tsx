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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
    SetPhone(data.Phone);//save in  state for Show phone 
    replace("LoginSms");
  };
  const [phone,SetPhone]=useState("")
  const [isFocused, setIsFocused] = useState(false);
  return (
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
        name="Phone"
        render={({ field: { value, onChange, onBlur } }) => (
          <View>
            <TextInput
              className={`border-2 text-black bg-[#F1F4FF] px-4 py-2 rounded-lg text-lg text-right mx-16 ${
                isFocused ? "border-[#1F41BB]" : "border-slate-300"
              }`}
              placeholder="شماره تلفن"
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
              <Text style={{ color: "red", textAlign: "center", marginTop: 6 }}>
                {formState.errors.Phone.message}
              </Text>
            )}
          </View>
        )}
      />
      <View className="w-full ">
        <View className=" mx-16 rounded-2xl  ">
          <Button
            title="تایید شماره تلفن"
            onPress={handleSubmit(onSubmit)}
            color={"#1F41BB"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
