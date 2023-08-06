import React from "react";
import { Route, HashRouter } from "react-router-dom";
import * as Firebase from '../firebase.js';

import MyNavbar from "./MyNavbar.js";
import Character from "./Character.js";
import Castle from "./Castle.js";
import Evil from "./Evil.js";
import Dungeon from "./Dungeon.js";
import PetsPanel from "./PetsPanel.js";

import FightStages from "./FightStages.js";

class Main extends React.Component {
  render(){
    return (
      <HashRouter>
        <div className="wrapper">

          {/* HEADER */}
          <MyNavbar />

          {/* CONTENT */}
          <div className="container-fluid">
            <Route exact path="/" component={Character}/>
            <Route path="/tower" render={()=> <FightStages reference={Firebase.storageTower} add={Firebase.addTowerStage} title="Tour"/>}/>
            <Route path="/tornado" render={()=> <FightStages reference={Firebase.storageTornado} add={Firebase.addTornadoStage} title="Tornade"/>}/>
            <Route path="/castle" component={Castle}/>
            <Route path="/evil" component={Evil}/>
            <Route path="/dungeons" render={()=> <Dungeon/>}/>
            <Route path="/devilsPortal" render={()=> <FightStages reference={Firebase.storageDevilsPortal} add={Firebase.addDevilsStage} title="Portail des démons"/>}/>
            <Route path="/pets" component={PetsPanel}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default Main;
