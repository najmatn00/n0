import React, { useState, useEffect, useCallback } from "react";
import { Bubble, GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, TextInput } from "react-native";
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // بارگذاری پیام‌ها از AsyncStorage در زمان لود اولیه صفحه
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem("chatMessages");
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    loadMessages();
  }, []);

  const onSend = useCallback((message = []) => {
    // ذخیره پیام‌ها در حالت محلی
    setMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, message);
      // ذخیره پیام‌های جدید در AsyncStorage
      AsyncStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  }, []);

  return (
    <GiftedChat
      messages={messages} // پیام‌های موجود
      onSend={(messages: any) => onSend(messages)} // تابع ارسال پیام
      user={{
        _id: 1, // شناسه کاربر
      }}
      // سفارشی‌سازی حباب‌های پیام
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#f0f", // رنگ پس‌زمینه پیام‌های ارسالی
            },
            left: {
              backgroundColor: "#0f0", // رنگ پس‌زمینه پیام‌های دریافتی
            },
          }}
        />
      )}
      // سفارشی‌سازی دکمه ارسال
      // renderSend={(props) => (
      //   <Send {...props}>
      //     <View style={{ marginRight: 10, marginBottom: 5 }}>
      //       <Text style={{ color: "blue" }}>Send</Text>
      //     </View>
      //   </Send>
      // )}
      // متن پیش‌فرض در ورودی پیام
      // placeholder="Type a message..."
      // سفارشی‌سازی نوار ورودی پیام
      // renderInputToolbar={(props) => (
      //   <InputToolbar
      //     {...props}
      //     containerStyle={{
      //       borderTopColor: "#333", // رنگ لبه بالای نوار ورودی
      //       borderTopWidth: 2, // عرض لبه بالای نوار ورودی
      //     }}
      //   />
      // )}
      // سفارشی‌سازی فوتر چت
      // renderChatFooter={() => (
      //   <View style={{ padding: 10 }}>
      //     <Text style={{ fontSize: 12, color: "gray" }}>Footer text here</Text>
      //   </View>
      // )}
      // نمایش وضعیت تایپ کردن
      isTyping={true}
    />
  );
};

export default ChatScreen;
