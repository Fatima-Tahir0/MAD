import React from "react";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import StackNavigator from "./StackNavigator";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const goToScreen = (screenName) => {
    props.navigation.navigate("Student App", {
      screen: screenName,
    });

    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>

      <DrawerItem
  label="Home"
  onPress={() => goToScreen("Home")}
  icon={({ color, size }) => (
    <Ionicons
      name="home-outline"
      size={size}
      color={color}
    />
  )}
/>

<DrawerItem
  label="Profile"
  onPress={() => goToScreen("Profile")}
  icon={({ color, size }) => (
    <Ionicons
      name="person-outline"
      size={size}
      color={color}
    />
  )}
/>

<DrawerItem
  label="Settings"
  onPress={() => goToScreen("Settings")}
  icon={({ color, size }) => (
    <Ionicons
      name="settings-outline"
      size={size}
      color={color}
    />
  )}
/>

<DrawerItem
  label="Contact"
  onPress={() => goToScreen("Contact")}
  icon={({ color, size }) => (
    <Ionicons
      name="mail-outline"
      size={size}
      color={color}
    />
  )}
/>

    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
    >

      <Drawer.Screen
        name="Student App"
        component={StackNavigator}
      />

    </Drawer.Navigator>
  );
}