import React from "react";
import Navbar from "./Navbar.js";
import Building from "./Building.js";

import * as Firebase from '../firebase.js';

const buildings = [
  {label:"Académie",link:"academy"},
  {label:"Banque",link:"bank"},
  {label:"Chateau fort",link:"castle"},
  {label:"Caserne",link:"caserne"},
  {label:"Carrière",link:"quarry"},
  {label:"Scierie",link:"sawmill"},
  {label:"Archierie",link:"bowman"},
  {label:"Forge",link:"foundry"},
  {label:"Fortifications",link:"walls"},
  {label:"Mine",link:"mine"},
  {label:"Quartier ouvrier",link:"workers"},
  {label:"Tour des mages",link:"wizards"}];

class Castle extends React.Component {
  constructor(props){
    super(props);
    this.state={
      building:0,
      images:[]
    }

    this.goTo = this.goTo.bind(this);
  }

  componentDidMount(){
    this.goTo(0);
  }

  goTo(index){
    const building = buildings[index];
    this.setState({building:index});

    Firebase.firebaseDb.ref(Firebase.storageBuildings+"/"+building.link)
    .once('value').then(function(snapshot){
      const images = [];
      for (var lvl in snapshot.val()){
        images.push(lvl.image);
      }
      this.setState({images:images});
    }.bind(this));
  }

  render(){
    return (
      <div>
        <div className="card text-center">
          <div className="card-header">
            <Navbar sections={buildings.map(b => b.label)} goTo={this.goTo} />
          </div>
          <h3>{buildings[this.state.building].label}</h3>
          <div className="card-body">
            <Building buildingName={buildings[this.state.building].link}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Castle;
