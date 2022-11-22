import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 30,
    paddingBottom: 30,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 28,
  },

  image: { flex: 1, height: 200, width: "100%" },

  text: { marginTop: 10, fontSize: 22, color: "tomato", fontWeight: "350" },

  description: { textAlign: "center", marginTop: 10 },
});
