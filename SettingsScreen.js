import React, { useState } from "react";

import {
  View,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";

import styles from "../components/styles";

//export default function SettingsScreen({ setScreen }) {
export default function SettingsScreen({ navigation }) {

  const [isDark, setIsDark] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#222" : "#fff",
        },
      ]}
    >

      <Text
        style={[
          styles.title,
          {
            color: isDark ? "#fff" : "#000",
          },
        ]}
      >
        Settings
      </Text>

      <Text
        style={{
          color: isDark ? "#fff" : "#000",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Dark Mode
      </Text>

      <Switch
        value={isDark}
        onValueChange={setIsDark}
      />

      

    </View>
  );
}