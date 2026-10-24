import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";
import {
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "../components/styles";

//export default function HomeScreen({ setScreen }) {
export default function HomeScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    PoppinsBold: Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={{
       uri: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
      }}
      style={styles.background}
    >

      <View style={styles.container}>

        <Text
          style={[
            styles.title,
            { fontFamily: "PoppinsBold" }
          ]}
        >
          Student App
        </Text>

        <TouchableOpacity
          style={styles.button}

          //onPress={() => setScreen("Profile")}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>
            Go to Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}

          // onPress={() => setScreen("Settings")}
          onPress={() => navigation.navigate("Settings")}
          
        >
          <Text style={styles.buttonText}>
            Go to Settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          
        //onPress={() => setScreen("Contact")}
        onPress={() => navigation.navigate("Contact")}
        >
          <Text style={styles.buttonText}>
            Go to Contact
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}