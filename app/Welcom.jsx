import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

const Welcome = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({}); // برای ذخیره پاسخ‌ها

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          // اولین بار است که اپلیکیشن باز می‌شود
          setShowQuestions(true);
          await AsyncStorage.setItem("hasLaunched", "true");
        } else {
          // اولین بار نیست
          setShowQuestions(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
      }
    };

    checkFirstLaunch();
  }, []);

  const handleAnswerChange = (question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question]: answer,
    }));
  };
  const { replace } = useRouter();
  const handleSubmit = async () => {
    try {
      // ذخیره پاسخ‌ها در AsyncStorage
      await AsyncStorage.setItem("userAnswers", JSON.stringify(answers));

      // بعد از ارسال، به صفحه خانه برو
      replace("/");
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  return (
    <View>
      {showQuestions ? (
        <View className="w-full h-full justify-center ">
          <Text className="text-2xl font-bold text-center mb-4">
            سوالات اولیه
          </Text>
          <Text className=" text-right text-xl font-semibold mx-4 mb-4">
            سوال 1:
          </Text>
          <TextInput
            className="mx-4 border-2 py-2 px-2 mb-4"
            placeholder="پاسخ سوال 1"
            onChangeText={(text) => handleAnswerChange("question1", text)}
          />
          <Text className=" text-right text-xl font-semibold mx-4 mb-4">
            سوال 2:
          </Text>
          <TextInput
            className="mx-4 border-2 py-2 px-2 mb-4"
            placeholder="پاسخ سوال 2"
            onChangeText={(text) => handleAnswerChange("question2", text)}
          />
          <View className="w-full justify-center">
            <View className="mx-4 mt-4">
              <Button title="ارسال" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      ) : (
        <View className="w-full justify-center h-full">
          <Link href={"/"} className="text-center text-2xl font-bold">
            خوش آمدید به اپلیکیشن!
          </Link>
        </View>
      )}
    </View>
  );
};

export default Welcome;
