import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./SongItemStyle";

const SongItem = ({ image, image1, name, title, id, song }) => {
  //navigation API
  const navigation = useNavigation();

  //on click go to specific song with params
  const specSoundVisible = () => {
    navigation.navigate("specSound", {
      id,
      song,
      image,
      image1,
      title,
      name,
    });
  };

  return (
    <View>
      <Pressable
        style={styles.container}
        android_ripple={{ color: "tomato" }}
        onPress={specSoundVisible}
      >
        <View>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.info}>
          <Text style={styles.Text}>{title}</Text>
          <Text style={styles.Text2}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SongItem;
