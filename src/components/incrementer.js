import React from 'react';

class Incrementer extends React.Component {
  updateValue(increment){
    const val = parseInt(this.props.value, 10);

    if (val + increment >= this.props.minValue){
      const curVal = val + increment;
      if (this.props.update != null) {
        this.props.update(curVal);
      }
    }
  }

  render () {
    return (
        <div>
          <span className="label btn label-danger" onClick={() => this.updateValue(-1)}>-</span>
          {"  " + this.props.value + "  "}
          <span className="label btn label-primary" onClick={() => this.updateValue(1)}>+</span>
        </div>
    )
  }
}

Incrementer.defaultProps = {
  value:0,
  minValue:0
};

export default Incrementer;
