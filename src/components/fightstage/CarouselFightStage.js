import React from 'react';
import { Media, Image } from 'react-bootstrap';

function StatValue(props){
  return(
    <div>
      <b>{props.label}</b>
      <div className="pull-right">
        {props.value}
      </div>
    </div>
  )
}

class CarouselFightStage extends React.Component {
  getStats(item){
    const attributs = item.attributs != null ?
      item.attributs :
      {
        stamina:"-",
        chance:"-",
        strength:"-",
        skill:"-",
        intelligence:"-"
      };

    return (
      <div>
        <StatValue label="Niveau" value={item.level} />
        <StatValue label="Force" value={attributs.strength} />
        <StatValue label="Habileté" value={attributs.skill} />
        <StatValue label="Intelligence" value={attributs.intelligence} />
        <StatValue label="Endurance" value={attributs.stamina} />
        <StatValue label="Chance" value={attributs.chance} />
      </div>
    )
  }

  render(){
    const item = this.props.item;
    const stair = this.props.stair;
    console.log(stair);

    return(
      <Media className="building-card">
        <Media.Left>
          <Image src={item.image} width={250} height={250}/>
        </Media.Left>
        <Media.Body align="">
          <Media.Heading className="container-fluid">
            <h3>{item.name}</h3>
            <h5>Étage {item.stair}</h5>
          </Media.Heading>
          {this.getStats(item)}
        </Media.Body>
      </Media>
    )
  }
}

CarouselFightStage.defaultProps = {
  item:{
    image:"./img/placeholder.png",
    name:"undefined",
    attributs:{
      stamina:0,
      chance:0,
    },
    stage:0
  },
  stage:{stage:0,name:"undefined"},
};

export default CarouselFightStage;
