import { TextInput, View, Pressable, Alert, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../../store/favorites-context";
import SearchList from "./SearchList/SearchList";
import { styles } from "./SearchStyle";
import { LinearGradient } from "expo-linear-gradient";

const Search = ({ navigation }) => {
  //get accessToken from context
  const context = useContext(FavoritesContext);
  const accessToken = context.accessToken;
  const i18n = context.i18n;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const fetching = async () => {
    if (query === "") {
      Alert.alert(i18n.t("searchEmptyTitle"), i18n.t("searchEmptyMessage"));
    } else {
      axios
        .get(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((response) => {
          setData(response.data.tracks.items);
          setQuery("");
        })
        .catch((error) => {
          Alert.alert(i18n.t("searchErrorTitle"), i18n.t("searchErrorMessage"));
        });
    }
  };

  const newSearchHandler = () => {
    setData([]);
  };

  const textChangeHandler = (text) => {
    setQuery(text);
  };

  useEffect(() => {
    if (data.length !== 0) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable style={styles.buttonContainer} onPress={newSearchHandler}>
            <Text style={styles.textButton}>{i18n.t("newSearch")}</Text>
            <Ionicons name={"search"} color={"tomato"} size={24} />
          </Pressable>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => null,
      });
    }
  }, [data]);

  if (data.length === 0) {
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={["tomato", "white", "tomato"]}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder={i18n.t("searchInput")}
            placeholderTextColor={"tomato"}
            onChangeText={textChangeHandler}
            value={query}
          />
          <Pressable style={styles.button} onPress={fetching}>
            <Text style={styles.text}>{i18n.t("searchButton")}</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  return <SearchList item={data} />;
};

export default Search;
