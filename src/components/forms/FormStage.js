import React from "react";
import { Image, Button, ButtonGroup, Form, ControlLabel, Media, Row } from 'react-bootstrap';
import FieldGroup from './FieldGroup.js';
import * as FormUtils from './FormUtils.js';

class FormStage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      level:0,
      name:'',
      image:"./img/placeholder.png",
      nbStage:null,
      attributs:{},
      file:null
    }
  }

  updateStats(attribut, event){
    const attr = this.state.attributs;
    attr[attribut] = event.target.value;
    this.setState({attributs : attr});
  }

  getStage = () => {
    const stage = {
      level:this.state.level,
      nbStage:this.state.nbStage,
      name:this.state.name,
      image:this.state.file,
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
              {/* STAIR */}
              <FieldGroup id="controllStage" type="number"
                label="Étage" placeholder="Enter stage"
                validation={FormUtils.validIntegerValue(this.state['nbStage'])}
                labelCol={3} fieldCol={9}
                onChange={(event) => this.setState({nbStage : event.target.value})}
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
              <Button bsStyle="primary" onClick={this.getStage}>Confirmer</Button>
              <Button bsStyle="danger" onClick={this.props.cancel}>Annuler</Button>
            </ButtonGroup>
          </Form>
        </Media.Body>
      </Media>
    )
  }
}

export default FormStage;
