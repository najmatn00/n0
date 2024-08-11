import React, { useState, useEffect, useCallback} from "react";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  // بارگذاری پیام‌ها از AsyncStorage در زمان لود اولیه صفحه
  useEffect(() => {
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

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => {
      const updatedMessages = GiftedChat.append(previousMessages, messages);
      // ذخیره پیام‌های جدید در AsyncStorage
      AsyncStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  }, []);

  return (
    <View className="mt-8" style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={{ flex: 1 }}
      >
        <View>
          <Image
            className="w-full "
            source={require("../../assets/images/headHome.png")}
          ></Image>
          <Text style={styles.fontS} className=" absolute top-4  right-6 text-[#CCCCCC] text-[13px] ">
            چه خبر آیسان خوبی؟
          </Text>
          <Text style={styles.fontS} className="absolute top-10 right-6 text-[#CCCCCC] text-[13px] ">
            برای یک روز هیجان انگیز آماده ای؟
          </Text>
        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={(props) => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: "#E88D67",
                },
                left: {
                  backgroundColor: "#F4F4F4",
                },
              }}
              textStyle={{
                right: {
                  color: "black",
                  fontFamily: "semi",
                  fontSize: 13,
                  
                  // رنگ متن پیام‌های ارسالی
                },
                left: {
                  fontSize:13,
                  color: "black",
                  fontFamily:"semi"// رنگ متن پیام‌های دریافتی
                },
                
              }}
            />
          )}
          isTyping={true}
        />
      </ImageBackground>
    </View>
  );
};
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
export default ChatScreen;
