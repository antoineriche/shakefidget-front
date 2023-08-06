import React from 'react';

class Carousel extends React.Component {
  render(){
    console.log(this.props.items);
    return(
      <div>
        <div className="btn-group btn-group-justified">
          <div className="btn btn-info" href={"#"+this.props.id} data-slide="prev">Précédent</div>
          <div className="btn btn-info" href={"#"+this.props.id} data-slide="next">Suivant</div>
        </div>
        <div id={this.props.id} className="carousel slide" data-interval="false">
          {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            {this.props.items}
          </div>
        </div>

      </div>
    )
  }
}

Carousel.defaultProps = {
  items:[
    {
      name:"michel2",
      stage:1,
      level:1,
      image:"./img/placeholder.png",
      attributs:{
        skill:132,
        chance:2354,
        stamina:176,
        strength:998,
        intelligence:97554
      }
    },
    {
      name:"michel1",
      stage:1,
      level:2,
      image:"./img/placeholder.png",
      attributs:{
        skill:132,
        chance:2354,
        stamina:176,
        strength:998,
        intelligence:97554
      }
    }
  ],
  loading:true,
};

export default Carousel;
