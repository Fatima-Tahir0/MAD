import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import styles from "../components/styles";

//export default function ContactScreen({ setScreen }) {
export default function ContactScreen({ navigation }) {

  const [email, setEmail] = useState("");

  const submitForm = () => {
    Alert.alert(
      "Submitted",
      "Your email is: " + email
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Contact
      </Text>

      {/* Email Input with Icon */}
      <View style={styles.inputContainer}>

        <FontAwesome
          name="envelope"
          size={20}
          color="black"
        />

        <TextInput
          placeholder="Enter your email"
          style={styles.contactInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={submitForm}
      >
        <Text style={styles.buttonText}>
          Submit
        </Text>
      </TouchableOpacity>

      

    </View>
  );
}