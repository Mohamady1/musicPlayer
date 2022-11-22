import * as SQLite from "expo-sqlite";

//create database if it doesn't exist
const db = SQLite.openDatabase("ids.db");

//create table if not exists
export const create = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favoriteSongsDetail (
            favoriteID INTERGER (100),
            song VARCHAR (999),
            image VARCHAR (999),
            image1 VARCHAR (999),
            title VARCHAR (100),
            artists text (999)
          )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

//insert in the table
export const insert = async (id, song, image, image1, title, artists) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO favoriteSongsDetail (favoriteID, song, image, image1, title, artists) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, song, image, image1, title, artists],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

//delete a specific item from the table
export const deleteSpecific = async (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM favoriteSongsDetail WHERE favoriteID = (?)`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

//get all data from table
export const getIDs = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM favoriteSongsDetail`,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

//delete all items from the table
export const deleteAllHandlerr = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM favoriteSongsDetail`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
