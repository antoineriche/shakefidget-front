import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBUGj3mtyJIJq_fkFVUYIxeRo-GHVbaGrg",
  authDomain: "songwritter-377b0.firebaseapp.com",
  databaseURL: "https://songwritter-377b0.firebaseio.com/",
  storageBucket: "gs://songwritter-377b0.appspot.com",
};

firebase.initializeApp(config);

export const firebaseDb = firebase.database();
export const firebaseStorage = firebase.storage().ref();

const dbShake = "/shakefidget"
export const dbCharacters = dbShake + "/characters"
export const storageTower = dbShake + "/tower"
export const storageTornado = dbShake + "/tornado"
export const storageBuildings = dbShake + "/buildings"
export const storageDevilsPortal = dbShake + "/devilsPortal"
export const storageDungeons = dbShake + "/dungeons"
export const storagePets = dbShake + "/pets"

export function updateCharacter(character) {
  firebaseDb.ref(dbCharacters + "/" + character.name).update(character);
}

export function addTowerStage(stair, towerStage){
  firebaseDb.ref(storageTower + "/" + stair).update(towerStage);
}

export function addBuliding(building){
  const update = {image:building.image};
  if(building.details != null){
    update['details']=building.details;
  }
  firebaseDb.ref(storageBuildings + "/" + building.name + "/" + building.level).update(update);
}

export function addDevilsStage(stair, devilStage){
  firebaseDb.ref(storageDevilsPortal + "/" + stair).update(devilStage);
}

export function addDungeon(key, dungeon){
  firebaseDb.ref(storageDungeons + "/" + key).update(dungeon);
}

export function addPet(element, index, pet){
  firebaseDb.ref(storagePets + "/" + element + "/" + index).update(pet);
  //.then(fctSuccess, fctFaillure)
}

export function addDungeonStage(ref, stage, dungeon){
  firebaseDb.ref(ref + "/" + stage).update(dungeon);
}

export function addTornadoStage(stair, tornadoStage){
  firebaseDb.ref(storageTornado + "/" + stair).update(tornadoStage);
}

export function getTowerImg(level) {
  return firebaseStorage.child(storageTower + "/tower" + level + ".png");
}
