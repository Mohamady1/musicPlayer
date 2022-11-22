import { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Image, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../UI/Loading";
import { FavoritesContext } from "../../store/favorites-context";
import styles from "./CategoriesStyle";

const Categories = () => {
  //navigation API
  const navigation = useNavigation();
  //get accessToken from context
  const context = useContext(FavoritesContext);
  const accessToken = context.accessToken;
  //set all categories from API
  const [categories, setCategories] = useState([]);
  //boolean to check is still loading or not
  const [isFetching, setIsFetching] = useState(true);

  //fetching all categories from API
  useEffect(() => {
    const fetchingSpotifyCategories = async () => {
      await axios
        .get("https://api.spotify.com/v1/browse/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          setCategories(response.data.categories.items);
          setIsFetching(false);
        })
        .catch((error) => {
          console.log("Post Error : " + error);
        });
    };
    fetchingSpotifyCategories();
  }, [accessToken]);

  //renderItem for FlatList
  const renderItem = (itemData) => {
    const goToAlbums = () => {
      navigation.navigate("Albums", {
        id: itemData.item.id,
        title: itemData.item.name,
      });
    };
    return (
      <Pressable onPress={goToAlbums}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: itemData.item.icons[0].url }}
          />
          <Text style={styles.text}>{itemData.item.name}</Text>
        </View>
      </Pressable>
    );
  };

  //if is still loading return loading ui
  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={categories}
        initialNumToRender={6}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Categories;
