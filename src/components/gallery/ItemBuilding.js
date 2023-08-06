import React from 'react';

class ItemBuilding extends React.Component {
  render(){
    const building = this.props.item;
    return (
      <div>
        <img className="card-img-top" width={150} height={150} src={building.image} alt=""/>
        <div className="card-body">
          <h5 className="card-title">Niveau {building.level}</h5>
        </div>
      </div>
    )
  }
}

export default ItemBuilding;

ItemBuilding.defaultProps = {
  item: {
    level:0,
    image:"./img/placeholder.png",
  }
};
