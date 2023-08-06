import React from "react";
import Navbar from "./Navbar.js";
import CharacterDetails from '../components/characters/CharacterDetails.js';
import * as Firebase from '../firebase.js';

class Character extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabs:[],
      characters:[],
      index:null
    }

    this.seeCharacter = this.seeCharacter.bind(this);
  }

  componentDidMount(){
    Firebase.firebaseDb.ref(Firebase.dbCharacters).on('value', function(snapshot) {
      const chars = Object.keys(snapshot.val()).map(
        key => snapshot.val()[key]
      );
      this.setState({characters:chars});
    }.bind(this));
  }

  seeCharacter(index){
    this.setState({index:index});
  }

  render(){
    return(
      <div>
        {
          this.state.characters.length > 0 &&
          <Navbar sections={this.state.characters.map(c => c.name)} goTo={this.seeCharacter}/>
        }

        <div className="container-fluid">
          { this.state.index != null &&
            <CharacterDetails character={this.state.characters[this.state.index]}/>
            // <MyDetails character={this.state.characters[this.state.index]}/>
          }
        </div>
      </div>
    )
  }
}

export default Character;
