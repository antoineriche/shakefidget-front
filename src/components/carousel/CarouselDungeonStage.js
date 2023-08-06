import React from 'react';

import { Media, Collapse, Button, Grid, Row, Col, Image, ListGroup, ListGroupItem } from 'react-bootstrap';


class CarouselDungeonStage extends React.Component {
  getStats(item){
    const attributs = item.attributs != null ? item.attributs : {
      stamina:"-",
      chance:"-",
      strength:"-",
      skill:"-",
      intelligence:"-"
    };

    return (
      <div>
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

    return(
      <Media className={"thumbnail dungeon-border " + this.props.world + "-border"}>
        <Media.Left>
          <Image src={item.image} width={120} height={120} rounded />
        </Media.Left>
        <Media.Body>
          <Media.Heading>
            <h4>{item.name}</h4>
            <h5>Étage {this.props.index}</h5>
          </Media.Heading>
          { this.getStats(item) }
        </Media.Body>
      </Media>
    )}
}

CarouselDungeonStage.defaultProps = {
  item:{
    image:"./img/placeholder.png",
    name:"undefined",
    stage:0
  },
};

export default CarouselDungeonStage;
