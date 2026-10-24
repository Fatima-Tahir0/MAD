import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "../components/styles";

// export default function ProfileScreen({ setScreen }) {
export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <View style={styles.profileContainer}>

      <Text style={styles.title}>
        Profile
      </Text>

      <Image
        source={{
     uri: "https://randomuser.me/api/portraits/women/65.jpg",
        }}
        style={styles.profileImage}
      />

      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Enter your age"
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        inputMode="numeric"
      />

      <Text style={styles.output}>
        Name: {name}
      </Text>

      <Text style={styles.output}>
        Age: {age}
      </Text>

     

    </View>
  );
}