import React, { Component } from 'react';
import PlayerCard from '../UI/PlayerCard';
import Fade from 'react-reveal/Fade';
import Stripes from '../../Resources/images/stripes.png';
import {firebase, players} from '../../firebase';
import {dbLoop} from '../UI/misc';
import {Promise} from 'core-js';
import { reject } from 'q';

class TheTeam extends Component {

    state = {
        loading: true,
        players:[]
    }

    componentDidMount(){
        players.once('value').then(snapshot =>{
            const players = dbLoop(snapshot, false);
            let promises = [];

            for(let i in players){
                promises.push(
                    new Promise((resolve, reject) =>{
                        firebase.storage().ref('players')
                        .child(players[i].image).getDownloadURL()
                        .then( url => {
                            players[i].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises).then(() =>{
                this.setState({
                    loading: false,
                    players
                })
            })
        })
    }

    ShowPlayersByCategory = (category) =>(
        this.state.players ?
            this.state.players.map((player, i) =>{
                return player.position === category ?
                    <Fade left delay={i*20} key={i}>
                        <div className="item">
                            <PlayerCard
                                name={player.name}
                                lastName={player.lastname}
                                number={player.number}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                :null
            })
        :null
    )

    render() {
        console.log(this.state.players)
        return (
            <div className="the_team_container" style={{background: `url(${Stripes}) repeat`}}>
                {!this.state.loading ?
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {this.ShowPlayersByCategory('Keeper')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Defenders</div>
                            <div className="team_cards">
                                {this.ShowPlayersByCategory('Defence')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Midfielders</div>
                            <div className="team_cards">
                                {this.ShowPlayersByCategory('Midfield')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Strikers</div>
                            <div className="team_cards">
                                {this.ShowPlayersByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                    :null
                }
            </div>
        );
    }
}

export default TheTeam;