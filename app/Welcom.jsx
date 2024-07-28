import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Welcome = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState({});
  const { replace } = useRouter(); // Use useRouter to get the replace method

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        if (hasLaunched === null) {
          setShowQuestions(true);
          await AsyncStorage.setItem("hasLaunched", "true");
        } else {
          replace("/home"); // Navigate directly to home if not the first launch
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

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("userAnswers", JSON.stringify(answers));
      replace("/home"); // Navigate to home after submitting answers
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  if (!showQuestions) {
    // If not showing questions, directly navigate to home
    return null; // or you can return a loader if you want
  }

  return (
    <View className="w-full h-full justify-center">
      <Text className="text-2xl font-bold text-center mb-4">سوالات اولیه</Text>
      <Text className="text-right text-xl font-semibold mx-4 mb-4">
        سوال 1:
      </Text>
      <TextInput
        className="mx-4 border-2 py-2 px-2 mb-4"
        placeholder="پاسخ سوال 1"
        onChangeText={(text) => handleAnswerChange("question1", text)}
      />
      <Text className="text-right text-xl font-semibold mx-4 mb-4">
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
  );
};

export default Welcome;
