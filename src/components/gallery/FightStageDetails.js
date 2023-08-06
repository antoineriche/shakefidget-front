import React from "react";

class FightStageDetails extends React.Component {
  render(){
    const item = this.props.item;
    return (
      <div className="thumbnail">
        <div className="caption">
          <div>
            <b>Étage {item.stage}</b>
          </div>
        </div>
        <img src={item.image} alt="avatar"/>
        <div className="caption">
          <h4>{item.name}</h4>
            <b>Level </b><div className="pull-right">{item.level}</div>
            { item.attributs != null &&
               <div>
                <br/>
                <b>Statistiques</b>
                <br/><b>Force </b><div className="pull-right">{item.attributs.strength}</div>
                <br/><b>Habileté </b>
                <div className="pull-right">{item.attributs.skill}</div>
                <br/><b>Intelligence </b>
                <div className="pull-right">{item.attributs.intelligence}</div>
                <br/><b>Endurance </b>
                <div className="pull-right">{item.attributs.stamina}</div>
                <br/><b>Chance </b>
                <div className="pull-right">{item.attributs.chance}</div>
              </div>
            }
        </div>
      </div>
    )
  }
}

export default FightStageDetails;
