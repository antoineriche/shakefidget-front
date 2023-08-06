import React from 'react';
import FightStage from "./FightStage.js"
import BuildingPanel from "./BuildingPanel.js"
import * as Firebase from '../../firebase.js';

class CharacterDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={character:props.character, detail:null};
    this.updateCharacter = this.updateCharacter.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.character !== this.state.character){
      this.setState({character:nextProps.character});
    }
  }

  incrementKey(key, increment){
    const char = this.state.character;
    char[key] += increment;
    this.updateCharacter(char);
  }

  updateKey(key, value){
    const char = this.state.character;
    char[key] = value;
    this.updateCharacter(char);
  }

  updateCharacter(char){
    Firebase.updateCharacter(char);
    this.setState({character:char});
  }

  openDialog(dialog){
    this.setState({detail: this.state.detail !== dialog ? dialog : null});
  }

  render(){
    const character = this.state.character;
    return(
      <div>
        <h1>Détails de {character.name}</h1>
        <div className="row">

          {/* THUMBNAIL */}
          <div className="col-md-3">
            <div className="thumbnail">
              <img src={character.img} alt=""/>
              <span className="btn btn-danger pull-left" onClick={() => this.incrementKey('level', -1)}>-</span>
              <span className="btn btn-success pull-right" onClick={() => this.incrementKey('level',+1)}>+</span>
              <div className="btn btn-primary center-block">Niveau {character.level}</div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="col-md-9">
            <div className="btn-group btn-group-justified">
              <div className="btn btn-primary" onClick={() => this.openDialog('tower')}>
                Tour {character.tower}
              </div>
              <div className="btn btn-primary" onClick={() => this.openDialog('tornado')}>
                Tornade {character.tornado}
              </div>
              <div className="btn btn-primary" onClick={() => this.openDialog('devilsPortal')}>
                Portail des démons {character.devilsPortal}
              </div>
              {/* <div className="btn btn-success" onClick={() => this.openDialog('castle')}>
                Chateau fort
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-12">
                { this.state.detail === 'tower' &&
                  <FightStage
                    stage={character.tower}
                    label="Tour"
                    reference={Firebase.storageTower}
                    updateValue={(level) => this.updateKey('tower', level)}
                    close={() => this.openDialog('tower')}/>
                }
                { this.state.detail === 'tornado' &&
                  <FightStage
                    stage={character.tornado}
                    label="Tornade"
                    reference={Firebase.storageTornado}
                    updateValue={(level) => this.updateKey('tornado', level)}
                    close={() => this.openDialog('tornado')}/>
                }
                { this.state.detail === 'devilsPortal' &&
                  <FightStage
                    stage={character.devilsPortal}
                    label="Portail des démons"
                    reference={Firebase.storageDevilsPortal}
                    updateValue={(level) => this.updateKey('devilsPortal', level)}
                    close={() => this.openDialog('devilsPortal')}/>
                }
              </div>
            </div>

            <div className="btn-group btn-group-justified">
              <div className="btn btn-success" onClick={() => this.openDialog('castle')}>
                Chateau fort
              </div>
            </div>

            {/* SECOND ROW */}
            { character.level >= 25 &&
              <div>
                {/* <div className="col-md-12"> */}
                  { this.state.detail === 'castle' &&
                    <BuildingPanel character={character.name} buildings={character.buildings}/>
                  }
                {/* </div> */}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterDetails;
