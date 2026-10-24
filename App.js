//USESTATE
/*import React, { useState } from "react";

import HomeScreen from "./frontend/screens/HomeScreen";
import ProfileScreen from "./frontend/screens/ProfileScreen";
import SettingsScreen from "./frontend/screens/SettingsScreen";
import ContactScreen from "./frontend/screens/ContactScreen";

export default function App() {
  const [screen, setScreen] = useState("Home");

  if (screen === "Home") {
    return <HomeScreen setScreen={setScreen} />;
  }

  if (screen === "Profile") {
    return <ProfileScreen setScreen={setScreen} />;
  }

  if (screen === "Settings") {
    return <SettingsScreen setScreen={setScreen} />;
  }

  if (screen === "Contact") {
    return <ContactScreen setScreen={setScreen} />;
  }
}*/

//NAVIGATION
import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import DrawerNavigator from "./frontend/navigation/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
