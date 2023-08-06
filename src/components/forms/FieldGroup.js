import React from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

class FieldGroup extends React.Component {
  render(){
    return(
      <FormGroup controlId={this.props.id}
        validationState={this.props.validation}>
        {
          this.props.labelCol != null &&
          <Col componentClass={ControlLabel} xs={this.props.labelCol}>
            {this.props.label}
          </Col>
        }
        {
          this.props.labelCol == null &&
          <ControlLabel>{this.props.label}</ControlLabel>
        }
        {
          this.props.fieldCol != null &&
          <Col xs={this.props.fieldCol}>
            <FormControl {...this.props} />
          </Col>
        }
        {
          this.props.fieldCol == null &&
          <FormControl {...this.props} />
        }

        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
      </FormGroup>
    )
  }
}

export default FieldGroup;
