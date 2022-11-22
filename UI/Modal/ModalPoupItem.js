import { Pressable, View, Image, Text } from "react-native";
import { useState, useContext } from "react";
import { FavoritesContext } from "../../store/favorites-context";
import { styles } from "./ModalPoupStyle";

const ModalPoupItem = ({ local, flag, language, visible }) => {
  const context = useContext(FavoritesContext);
  const [showModal, setShowModal] = useState(visible);

  return (
    <Pressable
      style={styles.Pressable}
      onPress={() => {
        context.changeLocale(local);
        setShowModal(!visible);
      }}
    >
      <Image resizeMode="stretch" style={styles.flagStyle} source={flag} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{language}</Text>
      </View>
    </Pressable>
  );
};

export default ModalPoupItem;
