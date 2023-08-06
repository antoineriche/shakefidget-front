import React from 'react';
import * as Firebase from '../firebase.js';
import FormDungeon from "../components/forms/FormDungeon.js";
import DungeonDetails from "./DungeonDetails.js";
import CarouselDungeonStage from "../components/carousel/CarouselDungeonStage.js";

import ModalDungeon from '../components/modal/ModalDungeon.js'
import ListItemDungeon from '../components/list/ListItemDungeon.js'

import {Button, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

class Dungeon extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reference:Firebase.storageDungeons,
      loading:true,
      dungeons:{},
      lgShow: false,
      adding:false,
    }
  }

  componentDidMount(){ this.attachCallback(this); }
  componentWillUnmount() {
    Firebase.firebaseDb.ref(Firebase.storageDungeons).off();
  }

  toggleDetails = (dungeonKey) => {
    const neoState = this.state[dungeonKey] != null ? !this.state[dungeonKey] : true;
    this.setState({[dungeonKey]: neoState});
  }

  attachCallback(pScope){
    Firebase.firebaseDb.ref(Firebase.storageDungeons)
    .on('value', function(snapshot){
      this.setState(
        {
          loading:false,
          dungeons:snapshot.val() != null ? snapshot.val() : {}
        });
    }.bind(pScope));
  }

  addDungeon = (dungeon) => {
    this.setState({adding:true});
    const ref = this.state.reference + '/' + dungeon.key;
    const task = Firebase.firebaseStorage.child(ref+"/"+dungeon.key+'.png').put(dungeon.image);

    task.on('state_changed', function(snapshot){}, function(error) {},
       function(){
         const d = {
           image:task.snapshot.downloadURL,
           name:dungeon.name,
           nbStages:dungeon.nbStages
         }
         Firebase.addDungeon(dungeon.key, d);
         this.setState({lgShow:false, adding:false});
       }.bind(this)
     );
  }

  render(){
    let lgClose = () => this.setState({ lgShow: false });
    const adding = this.state.adding;

    return(
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6}/>
            <Col md={6}>
              <Button bsStyle="primary" className="btn-block"
                onClick={() => this.setState({ lgShow: true })}>
                Ajouter un donjon
              </Button>
            </Col>
            <Col md={3}/>
          </Row>
        </Grid>

        <Grid>
          <Row>
            <Col md={12}>
              <ListGroup>
                {
                  !this.state.loading &&
                  Object.keys(this.state.dungeons).map(
                      (key) => (
                        <ListItemDungeon key={key} item={this.state.dungeons[key]}
                          reference={this.state.reference+"/"+key}/>
                      )
                    )
                  }
              </ListGroup>
            </Col>
          </Row>
          <ModalDungeon show={this.state.lgShow} onHide={lgClose}
            valid={this.addDungeon} loading={adding}/>
        </Grid>
      </div>
    )
  }
}

export default Dungeon;
