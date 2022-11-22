import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },

  image: { width: 120, height: 120, borderRadius: 60 },

  info: {
    width: Dimensions.get("window").width / 2,
    flexDirection: "column",
    alignItems: "center",
  },

  Text: {
    lineHeight: 22,
    marginBottom: 5,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "400",
    color: "tomato",
  },

  Text2: { textAlign: "center" },
});
