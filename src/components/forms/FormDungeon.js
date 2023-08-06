import React from "react";
import { Button, ButtonGroup, Form, Row, Media, Image } from 'react-bootstrap';
import FieldGroup from './FieldGroup.js';
import * as FormUtils from './FormUtils.js';

class FormStage extends React.Component {
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
    this.props.valid(this.state.world, dungeon);
  }

  render () {
    return (
      <Media className="thumbnail">
        <Media.Left>
          <Image src={this.state.image} width={80} height={80} rounded />
        </Media.Left>
        <Media.Body>
          <Form>
            <FieldGroup id="controllName" type="text"
              label="Clé" placeholder="Enter key"
              validation={FormUtils.validStringAttribut(this.state['key'], 5)}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.setState({key : event.target.value})}
            />
            <FieldGroup id="controllName" type="text"
              label="Nom" placeholder="Enter name"
              validation={FormUtils.validStringAttribut(this.state['name'], 5)}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.setState({name : event.target.value})}
            />
            <FieldGroup id="controllStage" type="number"
              label="Nombre d'étages" placeholder="Enter stairs count"
              validation={FormUtils.validIntegerValue(this.state['nbStages'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.setState({nbStages : event.target.value})}
            />
            <FieldGroup
              id="formControlsFile"
              type="file"
              label="File"
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
  };
}

FormStage.defaultProps = {
  valid: (dungeon) => console.log(dungeon),
};

export default FormStage;
