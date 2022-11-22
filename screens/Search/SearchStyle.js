import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "tomato",
    marginRight: 5,
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    marginLeft: 10,
    width: "70%",
    height: 50,
    borderWidth: 1,
    borderColor: "tomato",
    borderRadius: 20,
    color: "tomato",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 5,
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 20,
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
