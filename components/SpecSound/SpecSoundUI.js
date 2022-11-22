import { Image, View, Pressable, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./SpecSoundStyle";

const SpecSoundUI = ({ image, image1, icon, playSound, stopSound }) => {
  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.ImageBackground}
        source={{
          uri: image,
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.Image}
            source={{
              uri: image1,
            }}
          />
        </View>
        <View style={styles.playOnlyContainer}>
          <Pressable
            style={styles.playOnly}
            onPress={icon === "pause-circle-outline" ? stopSound : playSound}
          >
            <Ionicons name={icon} size={44} color={"tomato"} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SpecSoundUI;
