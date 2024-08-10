import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Link, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home';
import { checkUserLoggedIn } from "@/components/checkUserLoggedIn";

const HomeScreen = () => (
  <View style={styles.container}>
    <Home />
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const App = () => {
  const route = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkUserLoggedIn();
      if (!loggedIn) {
        route.replace("/Login");
      }
    };

    checkLoginStatus();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem("token");
    route.replace("/Login");
  };

  return (

      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-home'
                  : 'ios-home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        <Button title="Log Out" onPress={logOut} />
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
