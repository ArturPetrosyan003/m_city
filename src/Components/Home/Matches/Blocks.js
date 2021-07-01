import React, { Component } from 'react';
import { matches } from '../../../firebase';
import { dbLoop } from '../../UI/misc';
import MatchesBlock from '../../UI/matches_block';
import Slide from 'react-reveal';
import CircularProgress from '@material-ui/core/CircularProgress';

class Blocks extends Component {

    state = {
        isLoading: true,
        matches: []
    }

    componentDidMount() {
        matches.limitToLast(6).once('value').then((snapshot) => {
            const matches = dbLoop(snapshot);

            this.setState({
                matches: matches,
                isLoading: false
            })

        })
    }

    showMatches = (matches) => (
        matches ?
            matches.map((match) => {
                return (
                    <Slide bottom key={match.id}>
                        <div className="item">
                            <div className="wrapper">
                                <MatchesBlock match={match} />
                            </div>
                        </div>
                    </Slide>

                );
            })
            : null
    )

    render() {
        return (
            <div>
                {!this.state.isLoading ?
                    <div className="home_matches">
                        {this.showMatches(this.state.matches)}
                    </div>
                    :
                    <div className="admin_progress" style={{marginLeft: '50%'}}>
                        {this.state.isLoading ?
                            <CircularProgress thickness={7} style={{ color: '#ffffff' }} />
                            : null
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Blocks;