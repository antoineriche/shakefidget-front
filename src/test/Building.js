import React from 'react';
import ReactDOM from 'react-dom';
import * as Firebase from '../firebase.js';

import ModalBuilding from '../components/modal/ModalBuilding.js'

import Gallery from "../components/gallery/Gallery.js";
import ItemBuilding from "../components/gallery/ItemBuilding.js";

import Carousel from "../components/carousel/Carousel.js";
import CarouselBuildingItem from '../components/carousel/CarouselBuildingItem.js';

import { Button, Grid, Row, Col } from 'react-bootstrap';

const carouselId = "myCarousel";

class Building extends React.Component {
  constructor(props){
    super(props);
    this.state={
      buildingName:props.buildingName,
      levels:[],
      currentIndex:null,
      lgShow: false,
      adding:false,
    }
  }

  componentDidMount(){
    this.attachCallback(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.buildingName !== this.state.buildingName){
      Firebase.firebaseDb.ref(Firebase.storageBuildings+"/"+this.state.buildingName).off();
      this.setState({buildingName:nextProps.buildingName, levels:[], currentIndex:null}, () => {
        this.attachCallback(this);
      });
    }
  }

  attachCallback(pScope){
    Firebase.firebaseDb.ref(Firebase.storageBuildings+"/"+this.state.buildingName)
    .on('value', function(snapshot){
      const levels = [];
      if(snapshot.val() != null){
        Object.keys(snapshot.val()).map(
          (key) => {
            levels.push({
              image:snapshot.val()[key].image,
              details:snapshot.val()[key].details,
              level:key}
            );
        }
        )
      }
      this.setState({levels:levels});
    }.bind(pScope));
  }

  addBuildingLevel = (item) => {
    this.setState({adding:true});

    const task = Firebase.firebaseStorage
      .child(Firebase.storageBuildings+"/"+this.state.buildingName+'/'+item.level+'.png')
      .put(item.image);

    task.on('state_changed', function(snapshot){}, function(error) {},
       function(){
         const building = {
           name:this.state.buildingName,
           image:task.snapshot.downloadURL,
           level:item.level,
           details:item.details
         }

         Firebase.addBuliding(building);
         this.setState({lgShow:false, adding:false});
       }.bind(this)
     );
  }

  details = (index) => { this.setState({currentIndex:index}); }

  up = () => { ReactDOM.findDOMNode(this).scrollIntoView();}


  render(){
    let lgClose = () => this.setState({ lgShow: false });
    const adding = this.state.adding;

    return (
      <div>
        <Grid className="container-fluid">
          <Row>
            <Col md={6}>
              <Carousel
                items={
                  Object.keys(this.state.levels).map(
                    (key, index) =>
                      <div key={key} className={"item" + (index == (Object.keys(this.state.levels).length - 1) ? " active" : "")}>
                        <CarouselBuildingItem item={this.state.levels[key]} carousel={"#"+carouselId}/>
                      </div>
                  )
                } id={carouselId}/>
            </Col>
            <Col md={6}>
              <Button bsStyle="primary" className="btn-block"
                onClick={() => this.setState({ lgShow: true })}>
                Ajouter un niveau
              </Button>
            </Col>
          </Row>
        </Grid>
        <hr />
        <div className="padded">
          {Object.keys(this.state.levels).length} niveaux
        </div>
        <hr />

        <Gallery items=
          {
            Object.keys(this.state.levels).map(
              (key, index) =>
                <div key={key}
                  data-slide-to={index} data-target={"#" + carouselId}
                  onClick={this.up} className="container-fluid card building-card">
                  <ItemBuilding item={this.state.levels[key]}/>
                </div>
            )
          } colCount={6} />
          <ModalBuilding show={this.state.lgShow} onHide={lgClose} valid={this.addBuildingLevel} loading={adding}/>
      </div>
    )
  }
}

export default Building;
