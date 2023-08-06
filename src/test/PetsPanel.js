import React from 'react';
import * as Firebase from '../firebase.js';
import ModalPet from '../components/modal/ModalPet.js'
import { PageHeader, Media, Button, Grid, Row, Col, Image } from 'react-bootstrap';


class PetsPanel extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reference: Firebase.storagePets,
      lgShow: false,
      pets:{},
      adding:false
    }
  }

  componentDidMount(){
    this.attachCallback(this);
  }

  componentWillUnmount() {
    Firebase.firebaseDb.ref(this.state.reference).off();
  }

  addPet = (item) => {
    this.setState({adding:true});
    const element = item.element;
    const index = item.index;
    const pet = {
      image:item.image,
      level:item.level,
      name:item.name,
      attributs:item.attributs
    };

    const task = Firebase.firebaseStorage.child(this.state.reference+'/'+element+'/'+index+'.png')
    .put(pet.image);

    task.on('state_changed', function(snapshot){}, function(error) {},
       function(){
         pet.image = task.snapshot.downloadURL;
         Firebase.addPet(element, index, pet);
         this.setState({lgShow:false, adding:false});
       }.bind(this)
     );
  }

  attachCallback(pScope){
    Firebase.firebaseDb.ref(pScope.state.reference).on('value', function(snapshot){
      const pets = [];
      if(snapshot.val() != null){
        const pets = {};
        pets.water = snapshot.val()['water'] != null ? snapshot.val()['water'] : {};
        pets.fire = snapshot.val()['fire'] != null ? snapshot.val()['fire'] : {};
        pets.light = snapshot.val()['light'] != null ? snapshot.val()['light'] : {};
        pets.shadow = snapshot.val()['shadow'] != null ? snapshot.val()['shadow'] : {};
        pets.earth = snapshot.val()['earth'] != null ? snapshot.val()['earth'] : {};
        this.setState({pets:pets});
      } else {
          console.log('no pets available')
        }
      }.bind(pScope));
  }

  render(){
    let lgClose = () => this.setState({ lgShow: false });
    const adding = this.state.adding;

    return(
      <div className="container-fluid">
        <PageHeader>
          Welcome to the pets world <small>12</small>
        </PageHeader>
        <Grid>
          <Row>
            <Col md={6}/>
            <Col md={6}>
              <Button bsStyle="primary" className="btn-block"
                onClick={() => this.setState({ lgShow: true })}>
                Ajouter un familier
              </Button>
            </Col>
          </Row>
          {/* WATER */}
          <Row>
            <Col md={6}>
              {this.state.pets.water != null &&
               <p>{ Object.keys(this.state.pets.water).length }</p>
              }
              {
                this.state.pets.water != null &&
                Object.keys(this.state.pets.water).map(
                  (key) => (
                    <Media className="thumbnail">
                      <Media.Left>
                        <Image src={this.state.pets.water[key].image} width={80} height={80} rounded />
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>
                          {this.state.pets.water[key].name}
                        </Media.Heading>
                        {"Niveau " + this.state.pets.water[key].level}
                      </Media.Body>
                      
                    </Media>
                  )
                 )
              }
            </Col>
          </Row>
          {/* FIRE */}
          <Row>
            <Col md={6}>
              {this.state.pets.fire != null &&
               <p>{ Object.keys(this.state.pets.fire).length }</p>
              }
              {
                this.state.pets.fire != null &&
                Object.keys(this.state.pets.fire).map(
                  (key) => (
                    <Media className="thumbnail">
                      <Media.Left>
                        <Image src={this.state.pets.fire[key].image} width={80} height={80} rounded />
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>
                          {this.state.pets.fire[key].name}
                        </Media.Heading>
                        {"Niveau " + this.state.pets.fire[key].level}
                      </Media.Body>
                    </Media>
                  )
                 )
              }
            </Col>
          </Row>
          {/* EARTH */}
          <Row>
            <Col md={6}>
              {this.state.pets.earth != null &&
               <p>{ Object.keys(this.state.pets.earth).length }</p>
              }
              {
                this.state.pets.earth != null &&
                Object.keys(this.state.pets.earth).map(
                   (key) => (
                     <Media className="thumbnail">
                       <Media.Left>
                         <Image src={this.state.pets.earth[key].image} width={80} height={80} rounded />
                       </Media.Left>
                       <Media.Body>
                         <Media.Heading>
                           {this.state.pets.earth[key].name}
                         </Media.Heading>
                         {"Niveau " + this.state.pets.earth[key].level}
                       </Media.Body>
                     </Media>
                   )
                 )
              }
            </Col>
          </Row>
          {/* LIGHT */}
          <Row>
            <Col md={6}>
              {this.state.pets.light != null &&
               <p>{ Object.keys(this.state.pets.light).length }</p>
              }
              {
                this.state.pets.light != null &&
                Object.keys(this.state.pets.light).map(
                  (key) => (
                    <Media className="thumbnail">
                      <Media.Left>
                        <Image src={this.state.pets.light[key].image} width={80} height={80} rounded />
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>
                          {this.state.pets.light[key].name}
                        </Media.Heading>
                        {"Niveau " + this.state.pets.light[key].level}
                      </Media.Body>
                    </Media>
                  )
                 )
              }
            </Col>
          </Row>
          {/* SHADOW */}
          <Row>
            <Col md={6}>
              {this.state.pets.shadow != null &&
               <p>{ Object.keys(this.state.pets.shadow).length }</p>
              }
              {
                this.state.pets.shadow != null &&
                Object.keys(this.state.pets.shadow).map(
                  (key) => (
                    <Media className="thumbnail">
                      <Media.Left>
                        <Image src={this.state.pets.shadow[key].image} width={80} height={80} rounded />
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>
                          {this.state.pets.shadow[key].name}
                        </Media.Heading>
                        {"Niveau " + this.state.pets.shadow[key].level}
                      </Media.Body>
                    </Media>
                  )
                 )
              }
            </Col>
          </Row>
          <ModalPet show={this.state.lgShow} onHide={lgClose} valid={this.addPet} loading={adding}/>
        </Grid>
     </div>
    )
  }
}

export default PetsPanel;
