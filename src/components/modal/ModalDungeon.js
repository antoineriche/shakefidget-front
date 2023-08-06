import React from 'react';
import FormPet from '../forms/FormPet.js';
import { Image, Modal, Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Media, Grid, Row, Col } from 'react-bootstrap';
import FieldGroup from '../forms/FieldGroup.js';
import * as FormUtils from '../forms/FormUtils.js';

class ModalDungeon extends React.Component {
  constructor(props){
    super(props);
    this.state={
      key:'',
      nbStages:0,
      name:'',
      image:"./img/placeholder.png"
    }
  }

  getStage = () => {
    const dungeon = {
      key:this.state.key,
      name:this.state.name,
      nbStages:this.state.nbStages,
      image:this.state.file
    };
    this.props.valid(dungeon);
  }

  render() {
    const loading = this.props.loading;
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Ajouter un niveau</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Media>
            <Media.Left>
              <Image src={this.state.image} width={200} height={200} rounded />
              <FieldGroup
                id="formControlsFile" type="file" label="File"
                onChange={(event) => FormUtils.updateImage(event, this)}
              />
            </Media.Left>
            <Media.Body>
              <Form>
                {/* LEVEL */}
                <FieldGroup id="controllName" type="text"
                  label="Clé" placeholder="Enter key"
                  validation={FormUtils.validStringAttribut(this.state['key'], 5)}
                  labelCol={3} fieldCol={9}
                  onChange={(event) => this.setState({key : event.target.value})}
                />
                {/* NAME */}
                <FieldGroup id="controllName" type="text"
                  label="Nom" placeholder="Enter name"
                  validation={FormUtils.validStringAttribut(this.state['name'], 5)}
                  labelCol={3} fieldCol={9}
                  onChange={(event) => this.setState({name : event.target.value})}
                />
                {/* NB STAGES */}
                <FieldGroup id="controllStage" type="number"
                  label="Nombre d'étages" placeholder="Enter stairs count"
                  validation={FormUtils.validIntegerValue(this.state['nbStages'])}
                  labelCol={3} fieldCol={9}
                  onChange={(event) => this.setState({nbStages : event.target.value})}
                />
              </Form>
            </Media.Body>
          </Media>
        </Modal.Body>
        <Modal.Footer>
          {
            !loading &&
            <div>
              <Button bsStyle="danger" onClick={this.props.onHide}>Annuler</Button>
              <Button bsStyle="primary" onClick={this.getStage}>Enregistrer</Button>
            </div>
          }
          {
            loading &&
            <div>
              <Button bsStyle="danger" onClick={this.props.onHide} disabled>Annuler</Button>
              <Button bsStyle="primary" onClick={this.getStage} disabled>Enregistrer</Button>
            </div>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalDungeon;
