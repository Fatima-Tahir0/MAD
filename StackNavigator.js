import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Stack.Screen
        name="Contact"
        component={ContactScreen}
      />

    </Stack.Navigator>
  );
}