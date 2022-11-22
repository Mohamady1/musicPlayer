import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { credentials } from "../Auth/credentials";
import { en } from "../Localization/English";
import { ar } from "../Localization/Arabic";
import { tr } from "../Localization/Turkish";
import { de } from "../Localization/German";
import { it } from "../Localization/Italy";
import { fr } from "../Localization/France";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

export const FavoritesContext = createContext({
  accessToken: "",
  changeLocale: () => {},
  i18n: {},
});

const FavoritesContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  let [locale, setLocale] = useState(Localization.locale);
  const [i18n, setI18n] = useState(new I18n({ en, ar, tr, de, it, fr }));

  //post with spotify credentials to get accessToken
  useEffect(() => {
    const fetchAccessToken = async () => {
      await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        withCredentials: true,
        data: {
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + credentials,
        },
      })
        .then(function (response) {
          setAccessToken(response.data.access_token);
        })
        .catch((error) => {
          console.log("Post Error : " + error);
        });
    };
    fetchAccessToken();
  }, [3600 * 60]);

  //Translation config
  const changeLocale = (lang) => {
    setLocale(lang);
  };

  i18n.locale = locale;
  i18n.enableFallback = true;

  const values = {
    accessToken,
    changeLocale,
    i18n,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
