import React from "react";
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
  email: z.string().email("Please enter a valid email"),
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  // TODO: fix schema
  password: z.string().min(2, "Password must be at least 8 characters"),
});

const Login = () => {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
    },
    resolver: zodResolver(formSchema), // Assuming zodResolver is defined elsewhere
  });
  const { replace } = useRouter();
  const onSubmit = async (data: any) => {
    Alert.alert("Successful", JSON.stringify(data));
    await AsyncStorage.setItem("token", "token");
    replace("/");
  };

  return (
    <SafeAreaView className="w-full h-full justify-center bg-white   border-white space-y-4 ">
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="mb-4">
            <TextInput
              className=" border-2 text-black  border-slate-400 mx-16 px-4 py-1 rounded-2xl   text-lg"
              placeholder="Email"
              placeholderTextColor={"gray"}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {formState.errors.email && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 4 }}>
                {formState.errors.email.message}
              </Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="full_name"
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="mb-4">
            <TextInput
              className=" border-2 text-black  border-slate-400 mx-16 px-4 py-1 rounded-2xl  text-lg "
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={"gray"}
            />
            {formState.errors.full_name && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 4 }}>
                {formState.errors.full_name.message}
              </Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <View>
            <TextInput
              className=" border-2 text-black  border-slate-400 mx-16 px-4 py-1 rounded-2xl  text-lg "
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={"gray"}
            />
            {formState.errors.password && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 4 }}>
                {formState.errors.password.message}
              </Text>
            )}
          </View>
        )}
      />
      <View className="w-fit mx-36  ">
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          color={"#d344f2"}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
