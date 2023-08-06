import React from 'react';
import { Button, ButtonGroup, Form, Row, Media, Image } from 'react-bootstrap';
import FieldGroup from './FieldGroup.js';
import * as FormUtils from './FormUtils.js';

class BuildingForm extends React.Component {
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

  render(){
    return (
      <Media className="thumbnail">
        <Media.Left>
          <Image src={this.state.image} width={80} height={80} rounded />
        </Media.Left>
        <Media.Body>
          <Form>
            <Row>
            {/* LEVEL */}
            <FieldGroup id="controllLevel" type="number"
              label="Niveau" placeholder="Enter level"
              validation={FormUtils.validIntegerValue(this.state['level'])}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.setState({level : event.target.value})}
            />
            </Row>
            <Row>
            {/* DETAILS */}
            <FieldGroup id="controllName" type="text"
              label="Détails" placeholder="Enter details"
              validation={FormUtils.validStringAttribut(this.state['details'], 5)}
              labelCol={3} fieldCol={9}
              onChange={(event) => this.setState({details : event.target.value})}
            />
          </Row>
            {/* IMAGE */}
            <FieldGroup
              id="formControlsFile"
              type="file"
              label=""
              onChange={(event) => FormUtils.updateImage(event, this)}
            />
          </Form>
          <ButtonGroup>
            <Button bsStyle="primary" onClick={this.getStage}>Confirmer</Button>
            <Button bsStyle="danger" onClick={this.props.cancel}>Annuler</Button>
          </ButtonGroup>
        </Media.Body>
      </Media>
    )
  }
}

BuildingForm.defaultProps = {
  valid: (item) => console.log('default click on valid')
};

export default BuildingForm;
