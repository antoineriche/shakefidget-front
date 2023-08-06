import React from "react";
import { Image, Button, ButtonGroup, Form, FormGroup, FormControl, ControlLabel, Media, Grid, Row, Col } from 'react-bootstrap';
import FieldGroup from './FieldGroup.js';
import * as FormUtils from './FormUtils.js';

class FormPet extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index:0,
      level:0,
      name:'',
      image:"./img/placeholder.png",
      attributs:{}
    }
  }

  updateStats(attribut, event){
    const attr = this.state.attributs;
    attr[attribut] = event.target.value;
    this.setState({attributs : attr});
  }

  getPet = () => {
    const stage = {
      index:this.state.index,
      level:this.state.level,
      name:this.state.name,
      image:this.state.file,
      element:this.state.element,
      attributs:this.state.attributs
    };
    this.props.valid(stage)
  }

  render () {
    return (
      <Media className="thumbnail">
        <Media.Left>
          <Image src={this.state.image} width={80} height={80} rounded />
        </Media.Left>
        <Media.Body>
          <Form>
            <Row>
              {/* ELEMENT */}
              <FormGroup controlId="formControlsSelect">
                <Col md={3}>
                  <ControlLabel>Élément</ControlLabel>
                </Col>
                <Col md={9}>
                <FormControl componentClass="select" placeholder="select"
                  onChange={(event) => this.setState({element : event.target.value})}>
                  <option value="water">Eau</option>
                  <option value="fire">Feu</option>
                  <option value="earth">Terre</option>
                  <option value="light">Lumière</option>
                  <option value="shadow">Ombre</option>
                </FormControl>
                </Col>
              </FormGroup>
            </Row>
            <Row>
              {/* INDEX */}
              <FieldGroup id="controllStage" type="number"
                label="Index" placeholder="Enter index"
                validation={FormUtils.validIntegerValue(this.state['index'])}
                labelCol={3} fieldCol={9}
                onChange={(event) => this.setState({index : event.target.value})}
              />
            </Row>
            <Row>
              {/* NAME */}
              <FieldGroup id="controllName" type="text"
                label="Nom" placeholder="Enter name"
                validation={FormUtils.validStringAttribut(this.state['name'], 5)}
                labelCol={3} fieldCol={9}
                onChange={(event) => this.setState({name : event.target.value})}
              />
            </Row>
            <Row>
              {/* LEVEL */}
              <FieldGroup id="controllLevel" type="number"
                label="Niveau" placeholder="Enter level"
                validation={FormUtils.validIntegerValue(this.state['level'])}
                labelCol={3} fieldCol={9}
                onChange={(event) => this.setState({level : event.target.value})}
              />
            </Row>

            <ControlLabel>Stats</ControlLabel>
            {/* STRENGTH */}
            <FieldGroup id="controllName" type="text"
              label="Force" placeholder="Strength"
              validation={FormUtils.validIntegerValue(this.state['attributs']['strength'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.updateStats('strength', event)}
            />
            {/* SKILL */}
            <FieldGroup id="controllName" type="text"
              label="Habileté" placeholder="Skill"
              validation={FormUtils.validIntegerValue(this.state['attributs']['skill'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.updateStats('skill', event)}
            />
            {/* INTELLIGENCE */}
            <FieldGroup id="controllName" type="text"
              label="Intelligence" placeholder="Intelligence"
              validation={FormUtils.validIntegerValue(this.state['attributs']['intelligence'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.updateStats('intelligence', event)}
            />
            {/* STAMINA */}
            <FieldGroup id="controllName" type="text"
              label="Endurance" placeholder="Stamina"
              validation={FormUtils.validIntegerValue(this.state['attributs']['stamina'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.updateStats('stamina', event)}
            />
            {/* CHANCE */}
            <FieldGroup id="controllName" type="text"
              label="Chance" placeholder="Chance"
              validation={FormUtils.validIntegerValue(this.state['attributs']['chance'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.updateStats('chance', event)}
            />
            {/* FILE */}
            <FieldGroup
              id="formControlsFile" type="file" label="File"
              onChange={(event) => FormUtils.updateImage(event, this)}
            />

            <ButtonGroup>
              <Button bsStyle="primary" onClick={this.getPet}>Confirmer</Button>
              <Button bsStyle="danger" onClick={this.props.cancel}>Annuler</Button>
            </ButtonGroup>
          </Form>
        </Media.Body>
      </Media>
    )
  }
}

FormPet.defaultProps = {
  valid: (item) => console.log('default click on valid')
};

export default FormPet;
