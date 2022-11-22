import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import SongList from "../../components/SongList/SongList";
import { Ionicons } from "@expo/vector-icons";
import styles from "./FavouritesStyle";
import { deleteAllHandlerr, getIDs } from "../../DB/database";
import { FavoritesContext } from "../../store/favorites-context";

const Favourites = ({ navigation }) => {
  //final data to appear
  const [finalData, setFinalData] = useState([]);
  //context
  const context = useContext(FavoritesContext);
  const i18n = context.i18n;
  //fetch data from database
  useLayoutEffect(() => {
    const fetchidsData = async () => {
      const data = await getIDs();
      setFinalData(data);
    };
    fetchidsData();
  }, [finalData]);

  //delete all items in favorite page
  const deleteAllHandler = () => {
    Alert.alert(i18n.t("favoriteAlertTitle"), i18n.t("favoriteAlertMessage"), [
      {
        text: "Cancel",
        onPress: () =>
          Alert.alert(
            i18n.t("cancelDeleteTitle"),
            i18n.t("cancelDeleteMessage")
          ),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await deleteAllHandlerr();
        },
      },
    ]);
  };

  //Delete Icon
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={deleteAllHandler}>
          <View style={{ marginRight: 10 }}>
            <Ionicons name="trash" color="red" size={30} />
          </View>
        </Pressable>
      ),
    });
  }, []);

  //check if no favorite
  if (finalData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{i18n.t("emptyFavorite")}</Text>
      </View>
    );
  }

  return <SongList item={finalData.reverse()} />;
};

export default Favourites;
