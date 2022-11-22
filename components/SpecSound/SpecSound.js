import { Pressable, Alert } from "react-native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { deleteSpecific, getIDs, insert } from "../../DB/database";
import styles from "./SpecSoundStyle";
import SpecSoundUI from "./SpecSoundUI";
import * as Notifications from "expo-notifications";
import { FavoritesContext } from "../../store/favorites-context";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

const SpecSound = ({ route, navigation }) => {
  //context for translate
  const context = useContext(FavoritesContext);
  const i18n = context.i18n;
  //specific song details by routing
  const id = route.params.id;
  const song = route.params.song;
  const image = route.params.image;
  const image1 = route.params.image1;
  const title = route.params.title;
  const artist = route.params.name;
  //states to play sound
  const [sound, setSound] = useState();
  const [icon, setIcon] = useState("play-circle-outline");
  //all data from database
  const [dbData, setDbData] = useState([]);
  //ids only from database data
  let idsOnly = [];

  //fetch database data
  useEffect(() => {
    const fetchidsData = async () => {
      const data = await getIDs();
      setDbData(data);
    };
    fetchidsData();
  }, [dbData]);

  //push songs ids only in array when get new data from database
  let songIsFavorite;
  useEffect(() => {
    dbData.map((index) => idsOnly.push(index.favoriteID));
    songIsFavorite = idsOnly.includes(id);
  }, [dbData]);

  //notification response to click
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      () => {
        navigation.navigate("Favourites");
      }
    );
    return () => {
      subscription.remove();
    };
  });

  //notifaction on add to favorite
  const notification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: `${title} song is added to the Favourites Page`,
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  const changeFavoritesStatusHandler = () => {
    if (songIsFavorite) {
      deleteSpecific(id);
    } else {
      notification();
      insert(id, song, image, image1, title, JSON.stringify(artist));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={({ pressed }) => (pressed ? styles.pressed : null)}
            onPress={changeFavoritesStatusHandler}
          >
            <Ionicons
              name={songIsFavorite ? "star" : "star-outline"}
              color={"yellow"}
              size={34}
            />
          </Pressable>
        );
      },
      title: title + " 🎵",
    });
  }, [changeFavoritesStatusHandler]);

  //sound functions
  const playSound = async () => {
    if (song) {
      const { sound } = await Audio.Sound.createAsync(
        { uri: song },
        { shouldPlay: true }
      );
      setSound(sound);
      await sound.playAsync();
      setIcon("pause-circle-outline");
    } else {
      Alert.alert(i18n.t("errorTitle"), i18n.t("errorMessage"));
    }
  };

  const stopSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: song },
      { shouldPlay: false }
    );
    setSound();
    await sound.pauseAsync();
    setIcon("play-circle-outline");
  };

  //to unload song from memory
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
          setIcon("play-circle-outline");
        }
      : undefined;
  }, [sound]);

  const props = {
    image,
    image1,
    icon,
    playSound,
    stopSound,
  };

  return <SpecSoundUI {...props} />;
};

export default SpecSound;
