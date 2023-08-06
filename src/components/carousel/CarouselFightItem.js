import React from 'react';
import Image from 'react-image-resizer';

class CarouselFightItem extends React.Component {
  getStats(item){
    const attributs = item.attributs != null ? item.attributs : {
      stamina:"-",
      chance:"-",
      strength:"-",
      skill:"-",
      intelligence:"-"
    };

    return (
      <div className="container-fluid">
        <div className="row"/>
          <div className="col-md-6">
            <div>
              <b>Niveau </b>
              <div className="pull-right">
                {item.level}
              </div>
            </div>
            <div>
              <b>Force </b>
              <div className="pull-right">
                {attributs.strength}
              </div>
            </div>
            <div>
              <b>Habileté </b>
              <div className="pull-right">
                {attributs.skill}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <b>Intelligence </b>
              <div className="pull-right">
                {attributs.intelligence}
              </div>
            </div>
            <div>
              <b>Endurance </b>
              <div className="pull-right">
                {attributs.stamina}
              </div>
            </div>
            <div>
              <b>Chance </b>
              <div className="pull-right">
                {attributs.chance}
              </div>
            </div>
          </div>
      </div>
    )
  }

  render(){
    const item = this.props.item;
    const carousel = this.props.carousel;

    return(
      <div className="media thumbnail">
        <div className="media-left media-middle">
          <Image src={item.image} width={120} height={120} className="media-object"/>
        </div>
        <div className="media-body media-middle">
          <div className="media-heading">
            <h3>{item.name}</h3>
            <h5>Étage {item.stage}</h5>
          </div>
          { this.getStats(item) }
        </div>
      </div>
    )}
}

CarouselFightItem.defaultProps = {
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
  loading:true,
  close: () => console.log('close')
};

export default CarouselFightItem;
