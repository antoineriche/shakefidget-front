import React from 'react';
import Image from 'react-image-resizer';
import Incrementer from '../incrementer.js';
import * as Firebase from '../../firebase.js';

const defaultStage = {
  level:0,
  name:"undefined",
  image:"./img/placeholder.png",
  attributs:null,
}

class FightStage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      stage:{stage:props.stage},
      loading:props.loading
    }

    this.getData = this.getData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.stage !== this.state.stage.level){
      this.setState({
        stage:{stage:nextProps.stage},
        loading:true},
        () => this.getData(this)
      );
    }
  }

  componentDidMount(){
    this.setState({loading:true}, () => this.getData(this));
  }

  getData(pScope){
    Firebase.firebaseDb.ref(pScope.props.reference+"/"+pScope.state.stage.stage)
    .once('value').then(function(snapshot){
      const stage = snapshot.val() != null ? snapshot.val() : defaultStage;
      stage.stage = pScope.state.stage.stage;
      pScope.setState({stage:stage, loading:false});
    });
  }

  render(){
    const stage = this.state.stage;
    return (
      <div className="media">
        <div className="thumbnail">
          {
            this.state.loading &&
            <div>
              <div className="media-left">
                <Image src="./img/placeholder.png" width={100} height={100} className="media-object"/>
              </div>
              <div className="media-body">
                <h4 className="media-heading">Loading</h4>
              </div>
            </div>
          }
          {
            !this.state.loading &&
              <div>
                <div className="media-left">
                  <Image src={stage.image} width={100} height={100} className="media-object"/>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">
                    <b>{stage.name}</b>
                  </h4>
                  <div className="container-fluid">
                    <div className="col-md-4">
                      <Incrementer
                        update={(value) => this.props.updateValue(value)}
                        value={stage.stage}/>
                    </div>
                    { stage.attributs != null &&
                      <div>
                        <div className="col-md-4">
                          <div>
                            <b>Force </b>
                            <div className="pull-right">
                              {stage.attributs.strength}
                            </div>
                          </div>
                          <div>
                            <b>Habileté </b>
                            <div className="pull-right">
                              {stage.attributs.skill}
                            </div>
                          </div>
                          <div>
                            <b>Intelligence </b>
                            <div className="pull-right">
                              {stage.attributs.intelligence}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div>
                            <b>Endurance </b>
                            <div className="pull-right">
                              {stage.attributs.stamina}
                            </div>
                          </div>
                          <div>
                            <b>Chance </b>
                            <div className="pull-right">
                              {stage.attributs.chance}
                            </div>
                          </div>
                          <div className="pull-right">
                            <i className="btn glyphicon glyphicon glyphicon-chevron-up" onClick={this.props.close}/>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

FightStage.defaultProps = {
  image:"./img/placeholder.png",
  stage:{stage:0,name:"undefined"},
  loading:true,
  close: () => console.log('close')
};

export default FightStage;
