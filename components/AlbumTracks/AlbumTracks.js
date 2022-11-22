import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SongList from "../../components/SongList/SongList";
import Loading from "../../UI/Loading";
import { FavoritesContext } from "../../store/favorites-context";

const AlbumTracks = ({ route, navigation }) => {
  //album id
  const id = route.params.id;
  //album name
  const name = route.params.title;
  //get accessToken from context
  const context = useContext(FavoritesContext);
  const accessToken = context.accessToken;
  //boolean to check is still loading or not
  const [isFetching, setIsFetching] = useState(true);
  //allData from api
  const [allData, setAllData] = useState([]);

  //change screen title
  useEffect(() => {
    navigation.setOptions({
      title: name + " Tracks",
    });
  }, []);

  //allData songs from selected album
  useEffect(() => {
    const fetchingSpotifyArabicSongs = async () => {
      await axios
        .get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
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

  return <SongList item={allData} />;
};

export default AlbumTracks;
