import { View, FlatList } from "react-native";
import SearchItem from "./SearchItem/SearchItem";

const SearchList = ({ item }) => {
  //renderItem for flatList
  const renderItem = (itemData) => {
    const item = itemData.item;
    const songItemProps = {
      image: item.album.images[0].url,
      image1: item.album.images[1].url,
      name: item.album.artists.map((a) => a.name + ", "),
      id: item.id,
      title: item.name,
      song: item?.preview_url,
    };
    return (
      <View>
        <SearchItem {...songItemProps} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={item}
        initialNumToRender={6}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchList;
