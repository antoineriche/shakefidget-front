import React from 'react';
import * as Firebase from '../firebase.js';

import ModalDungeonStage from '../components/modal/ModalDungeonStage.js'
import CarouselDungeonStage from "../components/carousel/CarouselDungeonStage.js"
import { Button, Grid, Row, Col } from 'react-bootstrap';

class DungeonDetails extends React.Component {

  createGroupedArray(arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
  }

  addDungeonStage = (world, dungeon) => {
    const ref = this.props.reference+"/"+world;
    const task = Firebase.firebaseStorage.child(ref+'_'+dungeon.nbStage+'.png').put(dungeon.image);

    task.on('state_changed', function(snapshot){}, function(error) {},
       function(){
         const d = {
           image:task.snapshot.downloadURL,
           name:dungeon.name,
           level:dungeon.level,
           attributs:dungeon.attributs
         }

         Firebase.addDungeonStage(ref, dungeon.nbStage, d);
       }.bind(this)
     );
  }

  getItems = (nbStages, dungeon) => {
    const cols = [];
    for(var i = 1 ; i < parseInt(nbStages, 10) + 1 ; i++){
      let item;
      // LIGHT
      if(dungeon.light != null && dungeon.light[i] != null){
        const stage = dungeon.light[i];
        stage.stage = i;
        item=<CarouselDungeonStage item={stage} index={i} world={'light'}/>;
      } else {
        item =<CarouselDungeonStage index={i} world={'light'}/>;
      }
      cols.push(item);

      if(dungeon.dark != null && dungeon.dark[i] != null){
        const stage = dungeon.dark[i];
        stage.stage = i;
        item=<CarouselDungeonStage item={stage} index={i} world={'dark'}/>;
      } else {
        item =<CarouselDungeonStage index={i} world={'dark'}/>;
      }
      cols.push(item);
    }

    return this.createGroupedArray(cols, 2);
  }

  render(){
    const items = this.getItems(this.props.dungeon.nbStages, this.props.dungeon);

    return(
      <Grid>
        {
          items.map(
            (row, rowIndex) =>
              <Row key={rowIndex}>
                {
                  row.map(
                    (item, columnIndex) =>
                    <Col md={5}>
                      {item}
                    </Col>
                  )
              }
            </Row>
          )
        }
      </Grid>
    )
  }
}

export default DungeonDetails;
