import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import axios from "axios";
import { FavoritesContext } from "../../store/favorites-context";
import Loading from "../../UI/Loading";
import styles from "./AlbumsStyle";

const Album = ({ route, navigation }) => {
  //get accessToken from context
  const context = useContext(FavoritesContext);
  const accessToken = context.accessToken;
  //get category id from route params
  const id = route.params.id;
  //get category name from route
  const name = route.params.title;
  //set all albums data from api
  const [albums, setAlbums] = useState([]);
  //boolean to check is still loading or not
  const [isFetching, setIsFetching] = useState(true);

  //change screen name
  useEffect(() => {
    navigation.setOptions({
      title: name + " Albums",
    });
  }, []);

  //fetching all Albums in selected category
  useEffect(() => {
    const fetchingAlbumsInCategory = async () => {
      await axios
        .get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          setAlbums(response.data.playlists.items);
          setIsFetching(false);
        })
        .catch((error) => {
          console.log("Post Error : " + error);
        });
    };
    fetchingAlbumsInCategory();
  }, [accessToken]);

  //if still loading return loading ui
  if (isFetching) {
    return <Loading />;
  }

  //render item to flatList
  const renderItem = (itemData) => {
    //on album click
    const albumGoHandler = () => {
      navigation.navigate("albumTracks", {
        id: itemData.item.id,
        title: itemData.item.name,
      });
    };
    return (
      <Pressable onPress={albumGoHandler}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: itemData.item?.images[0].url }}
          />
          <Text style={styles.text}>{itemData.item?.name}</Text>
          <Text style={styles.description}>{itemData.item?.description}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <FlatList
        data={albums}
        initialNumToRender={6}
        keyExtractor={(item) => item?.id}
        renderItem={renderItem}
      />
    </View>
  );
};
export default Album;
