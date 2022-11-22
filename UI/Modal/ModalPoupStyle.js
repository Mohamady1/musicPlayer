import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flagStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "70%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  Pressable: {
    width: "80%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  textContainer: {
    width: "50%",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
});
