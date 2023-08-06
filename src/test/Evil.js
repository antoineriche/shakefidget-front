import React from "react";
import Navbar from "./Navbar.js";
import Building from "./Building.js";

import * as Firebase from '../firebase.js';

const buildings = [
  {label:"Coeur des ténèbres",link:"darkheart"},
  {label:"Extracteur d'âmes",link:"soulextract"},
  {label:"Salle de torture",link:"torture"},
  {label:"Gobelins",link:"gobelins"},
  {label:"Troll",link:"troll"},
  {label:"Gardien",link:"guardian"},
  {label:"Gladiateur",link:"gladiator"},
  {label:"Porte des enfers",link:"door"},
  {label:"Mine d'or",link:"goldmine"},
  {label:"Machine temportelle",link:"timemachine"}];

class Evil extends React.Component {
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

export default Evil;
