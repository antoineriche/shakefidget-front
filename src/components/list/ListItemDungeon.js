import React from 'react';
import * as Firebase from '../../firebase.js';

import {
  Media,
  Collapse,
  Button,
  Image,
  ListGroupItem,
  Label,
  Alert
} from 'react-bootstrap';
import ModalDungeonStage from '../modal/ModalDungeonStage.js'
import DungeonDetails from '../../test/DungeonDetails.js'

function MissingPart(props) {
  const scope = props.scope;
  const dungeon = props.dungeon;
  const missDark = scope.getMissingCount('dark', dungeon);
  const missLight = scope.getMissingCount('light', dungeon);

  const darkPart = (
    <Label className={missDark > 0 ? "myDark" : "myDarkComplete"}>
      {(dungeon.nbStages-missDark) + "/"+dungeon.nbStages}
    </Label>
  )

  const lightPart = (
    <Label className={missLight > 0 ? "myLight" : "myLightComplete"}>
      {(dungeon.nbStages-missLight) + "/"+dungeon.nbStages}
    </Label>
  )

  return(
    <div>
      {lightPart} {darkPart}
    </div>
  );
}

class ListItemDungeon extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  toggleDetails = (dungeonKey) => {
    const neoState = this.state[dungeonKey] != null ? !this.state[dungeonKey] : true;
    this.setState({[dungeonKey]: neoState});
  }

  getMissingStages = (dungeon) => {
    const missing = [];
    for (var i = 1 ; i <= parseInt(dungeon.nbStages, 10) ; i++){
      if(dungeon.stages == null || dungeon.stages[i] == null){
        missing.push(i);
      }
    }
    return missing;
  }

  getMissingCount = (world, dungeon) => {
    const stages = dungeon[world] != null ? dungeon[world] : {};
    return (dungeon.nbStages-Object.keys(stages).length);
  }

  addDungeonStage = (world, dungeon) => {
    this.setState({adding:true});
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
         this.setState({lgShow:false, adding:false});
       }.bind(this)
     );
  }

  render(){
    const key = this.props.key;
    const dungeon = this.props.item;
    const missings = this.getMissingStages(dungeon);
    const reference = this.props.reference;

    let lgClose = () => this.setState({ lgShow: false });
    const adding = this.state.adding;

    return (
      <ListGroupItem style={{outline:'none'}}>
        <Media>
          <Media.Left>
            <Image src={dungeon.image} width={80} height={80} rounded />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <h5>{dungeon.name}</h5>
            </Media.Heading>
            <p>{dungeon.nbStages + " niveaux"}</p>
            <MissingPart dungeon={dungeon} scope={this}/>
          </Media.Body>
          <Media.Right>
            <Button bsStyle="default" className="btn-block"
              onClick={() => this.toggleDetails(key)}>
              Détails
            </Button>
            <Button bsStyle="primary" className="btn-block"
              onClick={() => this.setState({ lgShow: true })}>
              Ajouter
            </Button>
          </Media.Right>
        </Media>
        <Collapse in={this.state[key]}>
          <div>
            <hr />
            {
              //CHANGE HERE
              missings.length > 0 &&
              <Alert bsStyle="danger">
                <strong>Niveaux manquants: </strong> {missings.join(' - ')}
              </Alert>
            }
            <DungeonDetails key={key} dungeon={dungeon} reference={reference}/>
          </div>
        </Collapse>
        <ModalDungeonStage show={this.state.lgShow} onHide={lgClose}
          valid={this.addDungeonStage} loading={adding}/>
      </ListGroupItem>
    )
  }
}

export default ListItemDungeon;
