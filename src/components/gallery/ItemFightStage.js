import React from 'react';
import * as Colors from '../../utils/colors.js';
import { OverlayTrigger, Popover, Button, Panel, Image, Media } from 'react-bootstrap';

class ItemFightStage extends React.Component {
  render(){
    const item = this.props.item;
    const bkg = item.attributs != null ? Colors.GREEN : Colors.RED;
    const popov = (
      <Popover id="popover-trigger-hover-focus" title={item.name}>
        <Image src={item.image} width={80} height={80}/>
      </Popover>
    );

    return (
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="bottom"
        placement="top" overlay={popov}>
        <div className="thumbnail btn" style={{background:bkg}}>
          <b>{item.stair}</b>
          <img src={item.image} alt={item.level} />
        </div>
      </OverlayTrigger>
    )
  }
}

export default ItemFightStage;

ItemFightStage.defaultProps = {
  item: {
    level:0,
    image:"./img/placeholder.png",
  },
  onClick: (item) => console.log('click ' + item.stage)
};
