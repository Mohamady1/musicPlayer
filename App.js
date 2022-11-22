import { useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home/Home";
import Favourites from "./screens/Favorites/Favourites";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SpecSound from "./components/SpecSound/SpecSound";
import FavoritesContextProvider, {
  FavoritesContext,
} from "./store/favorites-context";
import Categories from "./screens/Categories/Categories";
import Album from "./components/Albums/Albums";
import { create } from "./DB/database";
import AlbumTracks from "./components/AlbumTracks/AlbumTracks";
import Search from "./screens/Search/Search";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNav = () => {
  //context
  const context = useContext(FavoritesContext);
  const i18n = context.i18n;
  useEffect(() => {
    create();
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === i18n.t("home")) {
              icon = "home";
            } else if (route.name === i18n.t("favorites")) {
              icon = "star";
            } else if (route.name === i18n.t("categories")) {
              return (
                <MaterialIcons name="category" color={color} size={size} />
              );
            } else if (route.name === i18n.t("search")) {
              icon = "search";
            }
            return <Ionicons name={icon} color={color} size={size} />;
          },
          tabBarActiveTintColor: "tomato",
          headerTintColor: "tomato",
        })}
      >
        <Tab.Screen name={i18n.t("home")} component={Home} />
        <Tab.Screen name={i18n.t("categories")} component={Categories} />
        <Tab.Screen name={i18n.t("search")} component={Search} />
        <Tab.Screen name={i18n.t("favorites")} component={Favourites} />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <FavoritesContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "white" },
              headerTintColor: "tomato",
            }}
          >
            <Stack.Screen
              name="home"
              component={TabNav}
              options={{
                contentStyle: { backgroundColor: "lightgray" },
                headerShown: false,
              }}
            />
            <Stack.Screen name="specSound" component={SpecSound} />
            <Stack.Screen name="Albums" component={Album} />
            <Stack.Screen name="albumTracks" component={AlbumTracks} />
          </Stack.Navigator>
        </FavoritesContextProvider>
      </NavigationContainer>
    </>
  );
}
