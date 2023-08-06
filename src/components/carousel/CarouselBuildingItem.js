import React from 'react';
import Image from 'react-image-resizer';

class CarouselBuildingItem extends React.Component {
  render(){
    const item = this.props.item;
    const carousel = this.props.carousel;
    console.log(item);
    return(
      <div className="container-fluid card building-card">
        <img className="card-img-top" height={200} src={item.image} alt=""/>
        <div className="card-body">
          <div className="card-text padded">
            <b>Niveau {item.level} </b> { item.details != null && item.details !== "" && (" - " + item.details)}
          </div>
        </div>
      </div>
    )}
}

CarouselBuildingItem.defaultProps = {
  item:{
    image:"./img/placeholder.png",
    level:2
  }
};

export default CarouselBuildingItem;
