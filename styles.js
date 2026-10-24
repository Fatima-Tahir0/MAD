import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  
  title: {
    fontSize: 30,
  fontWeight: "bold",
  color: "#2e2f2f",
  backgroundColor: "#9ead96",
  paddingHorizontal: 40,
  paddingVertical: 10,
  borderRadius: 12,
  textAlign: "center",
  marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  button: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#b8d0ab",
    borderColor: "#3e3e3e",
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#263238",
  },

  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#274c41",
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10,
    color: "#333333",
  },

  inputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#535270",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },

  contactInput: {
    flex: 1,
    padding: 12,
  },

   background: {
    flex: 1,
  },

  output: {
    width: "90%",
    fontSize: 17,
    marginTop: 10,
  },

});

export default styles;