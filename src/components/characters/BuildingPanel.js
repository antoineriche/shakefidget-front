import React from 'react';
import Building from './Building.js';
import * as Firebase from '../../firebase.js';

class BuildingPanel extends React.Component {
  constructor(props){
    super(props);

    this.state={
      buildings:this.getBuildings(this.props.buildings),
      character:this.props.character
    };

    this.getBuildings = this.getBuildings.bind(this);
    this.updateBuilding = this.updateBuilding.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.character !== this.state.character){
      this.setState({
        character:nextProps.character,
        buildings:this.getBuildings(nextProps.buildings)
      });
    }
  }

  getBuildings(buildProps){
    const buildings = {
      castle:{
        key:'castle',
        name:"Chateau fort",
        level:0
      },
      academy:{
        key:'academy',
        name:"Académie",
        level:0
      },
      quarry:{
        key:'quarry',
        name:"Carrière",
        level:0
      },
      bank:{
        key:'bank',
        name:"Banque",
        level:0
      },
      caserne:{
        key:'caserne',
        name:"Caserne",
        level:0
      },
      bowman:{
        key:'bowman',
        name:"Archierie",
        level:0
      },
      sawmill:{
        key:'sawmill',
        name:"Scierie",
        level:0
      },
      foundry:{
        key:'foundry',
        name:"Forge",
        level:0
      },
      mine:{
        key:'mine',
        name:"Mine",
        level:0
      },
      walls:{
        key:'walls',
        name:"Fortifications",
        level:0
      },
      workers:{
        key:'workers',
        name:"Quartier ouvrier",
        level:0
      },
      wizards:{
        key:'wizards',
        name:"Tour des mages",
        level:0
      }
    };

    for (var building in buildProps){
      buildings[building].level= buildProps[building];
    }
    return buildings;
  }

  updateBuilding(building){
    const dbRef = Firebase.dbCharacters + "/" + this.props.character+"/buildings/";
    Firebase.firebaseDb.ref(dbRef).update({[building.key]:building.level});
  }

  render(){
    const buildings = this.state.buildings;
    return(
      <div>
        <div className="row">
          <div className="col-md-6">
            <Building building={buildings.castle} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-6">
            <Building building={buildings.quarry} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Building building={buildings.bank} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-6">
            <Building building={buildings.caserne} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Building building={buildings.bowman} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-6">
            <Building building={buildings.sawmill} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Building building={buildings.academy} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-6">
            <Building building={buildings.foundry} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Building building={buildings.mine} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-4">
            <Building building={buildings.walls} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-4">
            <Building building={buildings.mine} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Building building={buildings.workers} updateBuilding={this.updateBuilding}/>
          </div>
          <div className="col-md-6">
            <Building building={buildings.wizards} updateBuilding={this.updateBuilding}/>
          </div>
        </div>
      </div>
    )
  }
}

export default BuildingPanel;
