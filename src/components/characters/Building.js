import React from 'react';
import * as Firebase from '../../firebase.js';
import Image from 'react-image-resizer';

import Incrementer from '../incrementer.js';

class Building extends React.Component {
  constructor(props){
    super(props);
    this.state={
      building:this.props.building
    };
    this.getDetails = this.getDetails.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
  }

  componentDidMount(){
    this.setState({building:this.props.building},
      () => this.getDetails(this.props.building));
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.building.key);
    this.getDetails(nextProps.building);
  }

  getDetails(building){
    Firebase.firebaseDb.ref(Firebase.storageBuildings+"/"+building.key+"/"+building.level)
    .once('value').then(function(snapBuilding){
      const build = building;
      build["image"] = snapBuilding.val() != null ? snapBuilding.val().image : "./img/placeholder.png";
      this.setState({building:build}, () => {console.log('state has been updated'); console.log('Level: ' + this.state.building.level)});
    }.bind(this));
  }

  updateLevel(level){
    const building = this.state.building;
    building.level = level;
    if(this.props.updateBuilding != null){
      this.props.updateBuilding(building);
    }
  }

  render(){
    const building = this.state.building;
    return(
      <div className="media">
          <div className="thumbnail">

            <div className="media-left">
              <div className="media-heading">
                <b>{building.name}</b>
              </div>
              <Image src={building.image} width={150} height={150} className="media-object"/>
              <Incrementer
                update={(level) => this.updateLevel(level)}
                value={building.level}/>
            </div>

            {/* <div className="media-body">
                <div>

              </div>
            </div> */}
          </div>
      </div>
    )
  }
}

Building.defaultProps = {
  building: {
    level:0,
    image:"./img/placeholder.png",
    name:"undefined"
  }
};

export default Building;
