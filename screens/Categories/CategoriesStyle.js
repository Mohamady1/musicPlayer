import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: { flex: 1 },

  container: {
    overflow: "hidden",
    display: "flex",
    backgroundColor: "white",
    height: 350,
    marginTop: 30,
    paddingBottom: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: { width: "100%", height: 275, borderRadius: 20 },

  text: { fontSize: 20, color: "tomato", fontWeight: "800" },
});
