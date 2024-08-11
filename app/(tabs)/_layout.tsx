import { Tabs } from "expo-router";
import { View ,Image} from "react-native";
import Chaticon from "../../assets/images/Vector.svg";
import Homeicon from "../../assets/images/home.svg";
import Proicon from "../../assets/images/me.svg";
import Logout from "../../assets/images/logout.svg";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#005C78", // رنگ آیتم فعال
        tabBarInactiveTintColor: "#EEEEEE", // رنگ آیتم غیرفعال
        tabBarShowLabel: false, // مخفی کردن نام تب‌ها
        tabBarStyle: {
          backgroundColor: "#005C78", // رنگ پس‌زمینه tabBar
          // borderTopWidth: 0, // حذف خط بالای tabBar
          height: 70, // ارتفاع tabBar
          paddingBottom: 10, // فاصله پایین برای آیکون‌ها
          paddingTop: 10, // فاصله بالا برای آیکون‌ها
          borderTopLeftRadius:30,
          borderTopRightRadius:30
        },
        tabBarIconStyle: {
          fontSize: 23, // سایز آیکون‌ها
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          // title: "Home",
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color ,focused }) => ( 
            <View
            style={{
              backgroundColor: focused ? "#F4F4F4" : "transparent", // بک‌گراند خاکستری در حالت فعال
              padding: 8,
              borderRadius: 60,
            }}
          >
            <Homeicon  width={28} height={28} fill={color} />
            </View>
          ),
        }}
      />
       <Tabs.Screen
        name="Chat"
        options={{
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color ,focused }) => (
            <View
            style={{
              backgroundColor: focused ? "#F4F4F4" : "transparent", // بک‌گراند خاکستری در حالت فعال
              padding: 10,
              borderRadius: 25,
            }}
          >
            <Chaticon  width={28} height={28} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          // title: "profile",
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color ,focused }) => (
            <View
            style={{
              backgroundColor: focused ? "#F4F4F4" : "transparent", // بک‌گراند خاکستری در حالت فعال
              padding: 10,
              borderRadius: 25,
            }}
          >
            <Proicon  width={28} height={28} fill={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="logOut"
        options={{
          title: "logout",
          headerShadowVisible: false,
          headerShown: false,
          tabBarIcon: ({ color ,focused }) => (
            <View
            style={{
              backgroundColor: focused ? "#F4F4F4" : "transparent", // بک‌گراند خاکستری در حالت فعال
              padding: 10,
              borderRadius: 25,
            }}
          >
            <Logout  width={10} height={28} fill={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
