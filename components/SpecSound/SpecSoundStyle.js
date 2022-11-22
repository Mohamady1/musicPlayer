import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  root: {
    flex: 1,
  },

  ImageBackground: {
    flex: 1,
    opacity: 0.75,
  },

  Image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  imageContainer: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    top: (height * 20) / 100,
  },

  iconContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderRadius: 100,
  },

  playOnlyContainer: {
    width: "100%",
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },

  playOnly: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },

  pressed: {
    opacity: 0.5,
  },
});
