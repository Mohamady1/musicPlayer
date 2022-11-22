import { Pressable, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SongList from "../../components/SongList/SongList";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../UI/Loading";
import { FavoritesContext } from "../../store/favorites-context";
import ModalPoup from "../../UI/Modal/ModalPoup";

const Home = ({ navigation }) => {
  //get accessToken from context
  const context = useContext(FavoritesContext);
  const accessToken = context.accessToken;
  //boolean to check is still loading or not
  const [isFetching, setIsFetching] = useState(true);
  //allData from api
  const [allData, setAllData] = useState([]);
  //setModal
  const [modalVisible, setModalVisible] = useState(false);

  const clickHandler = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={clickHandler}>
          <View style={{ marginRight: 10 }}>
            <Ionicons name="globe" color="gray" size={30} />
          </View>
        </Pressable>
      ),
      title: context.i18n.t("home"),
    });
  }, []);

  //allData from api to fetch arabic songs
  useEffect(() => {
    const fetchingSpotifyArabicSongs = async () => {
      await axios
        .get(
          `https://api.spotify.com/v1/playlists/37i9dQZF1DX5cO1uP1XC1g/tracks`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          setAllData(response.data.items);
          setIsFetching(false);
        })
        .catch((error) => {
          console.log("Post Error : " + error);
        });
    };
    fetchingSpotifyArabicSongs();
  }, [accessToken]);

  //if is still loading return loading ui
  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ModalPoup visible={modalVisible}></ModalPoup>
      <SongList item={allData} />
    </View>
  );
};

export default Home;
