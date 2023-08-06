import React from 'react';
import ReactDOM from 'react-dom';
import * as Firebase from '../firebase.js';

import ModalFightStage from '../components/modal/ModalFightStage.js'

import Gallery from "../components/gallery/Gallery.js";
import ItemFightStage from "../components/gallery/ItemFightStage.js";

import Carousel from "../components/carousel/Carousel.js";
import CarouselFightItem from '../components/carousel/CarouselFightItem.js';

import {IncompleteStage, MissingStage} from "../components/fightstage/StageUtils.js";
import CarouselFightStage from '../components/fightstage/CarouselFightStage.js';

import { PageHeader, OverlayTrigger, Popover, Image, Button, Grid, Row, Col, ListGroupItem } from 'react-bootstrap';


const carouselId = "myCarousel";
const popoverTop = (
  <Popover id="popover-trigger-hover-focus" title="Popover bottom">
    <Image src="./img/placeholder.png" width={80} height={80}/>
  </Popover>
);

function Popov(props){
  return(
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <Image src={props.stage.image} width={80} height={80}/>
    </Popover>
  )
}

class FightStages extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      stages:[],
      lgShow: false,
      adding:false
    };
  }

  componentDidMount(){
    Firebase.firebaseDb.ref(this.props.reference).on('value', function(snapshot) {
      this.getImages(snapshot.val());
    }.bind(this));
  }

  up = () => { ReactDOM.findDOMNode(this).scrollIntoView();}

  getImages = (img) => {
    const pics = [];

    if(img != null){
      Object.keys(img).forEach(function(key) {
        img[key].stair = key;
        pics.push(img[key]);
      });
    }

   this.setState({loading:false, stages:pics});
  }

  getMissingStages = () => {
    const missing = [];
    const stages = this.state.stages.map(
      stage => parseInt(stage.stair, 10)
    );
    for (var i = 1 ; i < stages[stages.length -1] ; i++){
      if(!stages.includes(i)){
        missing.push(i);
      }
    }
    return missing;
  }

  getIncompleteStages = () => {
    const incompleted = [];
    this.state.stages.forEach(function(stage){
      if(stage.attributs == null){
        incompleted.push(stage.stair);
      }
    });
    return incompleted;
  }

  addItem = (item) => {
    this.setState({adding:true});
    console.log(item);
    const task = Firebase.firebaseStorage.child(this.props.reference+'/'+item.nbStage+'.png').put(item.image);
    task.on('state_changed', function(snapshot){}, function(error) {},
       function(){
         const stage={
           level:item.level,
           image:task.snapshot.downloadURL,
           name:item.name,
           attributs:item.attributs
         }
         this.props.add(item.nbStage, stage);
         this.setState({lgShow:false, adding:false});
       }.bind(this)
     );
  }

  render(){

    let lgClose = () => this.setState({ lgShow: false });
    const adding = this.state.adding;

    const stagesCount = Object.keys(this.state.stages).length;
    const stages = this.state.stages;
    const missings = this.getMissingStages();
    const incomplets = this.getIncompleteStages();

    return(

      <div className="container-fluid">
        <PageHeader>
          {this.props.title} <small>{stagesCount} nieaux</small>
          <Button bsStyle="primary" className="pull-right"
            onClick={() => this.setState({ lgShow: true })}>
              Ajouter un étage
          </Button>
        </PageHeader>
        <Grid>
          <Row>
            <Col md={3}/>
            <Col md={6}>
              <Carousel
                items={
                  Object.keys(stages).map(
                    (key, index) =>
                      <div key={key} className={"item" + (index == (stagesCount - 1) ? " active" : "")}>
                        <CarouselFightStage item={stages[key]} carousel={"#"+carouselId}/>
                      </div>
                  )
                } id={carouselId}/>
            </Col>
            <Col md={3}>
              <MissingStage missings={missings}/>
              <IncompleteStage incomplete={incomplets}/>
            </Col>
          </Row>
        </Grid>

        <hr />

        {/* GALLERY */}
        <Row>
          <div className="col-md-12">
            <Gallery items=
            {
              Object.keys(stages).map(
                (key, index) => (
                  <div key={key} data-slide-to={key} title={key}
                    data-target={"#" + carouselId} onClick={this.up}>
                    <ItemFightStage item={stages[key]}/>
                  </div>
                 )
               )
             } />
          </div>
        </Row>
        <ModalFightStage show={this.state.lgShow} onHide={lgClose} valid={this.addItem} loading={adding}/>
      </div>
    )
  }
}

FightStages.defaultProps = {
  title:"Title",
  stages:[],
  loading:true
};

export default FightStages;
