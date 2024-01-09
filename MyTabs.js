import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import Spinner from "react-native-loading-spinner-overlay";
const HOME_URL = "https://movieverse2024.site";
const BOARD_URL = "https://movieverse2024.site/board/gather";
const CHATTING_URL = "https://movieverse2024.site/kikilist";
const SETTING_URL = "https://movieverse2024.site/mypage";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"clipboard"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chatting"
        component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"rocketchat"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"settings"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      webViewRef.current.injectJavaScript(`location.href=${HOME_URL}`);
      setLoading(false);
    }, [])
  );

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: HOME_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Board({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: BOARD_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Chatting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: CHATTING_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

function Setting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
    return <Spinner visible={loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: SETTING_URL }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tabBarStyle: {
    ...Platform.select({
      ios: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 10,
      },
      android: {
        height: 60,
        paddingTop: 8,
        paddingBottom: 8,
        // marginBottom: 10, // 안드로이드에서는 marginBottom을 제외
      },
    }),
  },
});
