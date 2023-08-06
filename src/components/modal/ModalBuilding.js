import React from 'react';
import FormPet from '../forms/FormPet.js';
import { Image, Modal, Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Media, Grid, Row, Col } from 'react-bootstrap';
import FieldGroup from '../forms/FieldGroup.js';
import * as FormUtils from '../forms/FormUtils.js';

class ModalBuilding extends React.Component {
  constructor(props){
    super(props);
    this.state={
      level:0,
      image:"./img/placeholder.png",
      details:''
    }
  }

  getStage = () => {
    const stage = {
      level:this.state.level,
      image:this.state.file,
      details:this.state.details
    };

    this.props.valid(stage);
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
                <FieldGroup id="controllLevel" type="number"
                  label="Niveau" placeholder="Enter level"
                  validation={FormUtils.validIntegerValue(this.state['level'])}
                  labelCol={3} fieldCol={9}
                  onChange={(event) => this.setState({level : event.target.value})}
                />
                {/* DETAILS */}
                <FieldGroup id="formControlsTextarea" type="textarea"
                  componentClass="textarea" placeholder="textarea"
                  label="Détails" placeholder="Enter details"
                  validation={FormUtils.validStringAttribut(this.state['details'], 5)}
                  labelCol={3} fieldCol={9}
                  onChange={(event) => this.setState({details : event.target.value})}
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

export default ModalBuilding;
