import { View, FlatList } from "react-native";
import SongItem from "./SongItem/SongItem";

const SongList = ({ item }) => {
  //renderItem for flatList
  const renderItem = (itemData) => {
    const item = itemData.item;
    //data from my database or API
    let data = item.image; //true or false
    let songItemProps;
    if (data) {
      songItemProps = {
        image: item.image,
        image1: item.image1,
        name: item.artists,
        id: item.favoriteID,
        title: item.title,
        song: item.song,
      };
    } else {
      songItemProps = {
        image: item.track.album.images[0].url,
        image1: item.track.album.images[1].url,
        name: item.track.album.artists.map((a) => a.name + ", "),
        id: item.track.id,
        title: item.track.name,
        song: item.track.preview_url,
      };
    }

    return (
      <View>
        <SongItem {...songItemProps} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={item}
        initialNumToRender={6}
        keyExtractor={(item) =>
          item.favoriteID ? item.favoriteID : item.track.id
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default SongList;
