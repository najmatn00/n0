import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "./(tabs)";
import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
