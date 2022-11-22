import { ActivityIndicator, View } from "react-native";
import styles from "./LoadingStyle";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

export default Loading;
