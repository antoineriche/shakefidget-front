import React from 'react';
import { Alert } from 'react-bootstrap';

/*
  MISSING STAGES
  Danger Alert with missing stages
*/
export class MissingStage extends React.Component {
  render(){
    const missings = this.props.missings;
    return(
      missings.length > 0 ?
        (
          <Alert bsStyle="danger">
            <strong>Manquants ({missings.length})</strong>
            <br/><small>{missings.join(' - ')}</small>
          </Alert>
        ) : null
    )
  }
}

MissingStage.defaultProps = {
  missings:null
};

/*
  INCOMPETE STAGES
  Warning Alert with incomplete stages
*/
export class IncompleteStage extends React.Component {
  render(){
    const incomplete = this.props.incomplete;
    return(
      incomplete.length > 0 ?
        (
          <Alert bsStyle="warning">
            <strong>Incomplets ({incomplete.length})</strong>
            <br/><small>{incomplete.join(' - ')}</small>
          </Alert>
        ) : null
    )
  }
}

IncompleteStage.defaultProps = {
  incomplete:null
};
