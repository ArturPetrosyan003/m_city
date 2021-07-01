import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { matches } from '../../firebase';
import { dbLoop } from '../UI/misc';
import LeagueTable from './Table';
import MatchesList from './MatchesList';

class TheMatches extends Component {

    state = {
        isLoading: true,
        matches: [],
        filterMatches: [],
        statusFilter: 'All',
        resultFilter: 'All'
    }

    ShowMatchesByFilter = (status, type) => {
        if (type === 'status') {
            const list = this.state.matches.filter((match) => {
                return match.final === status
            });

            this.setState({
                filterMatches: status === 'All' ? this.state.matches : list,
                statusFilter: status,
                resultFilter: 'All'
            })
        }
        else if(type === 'result'){
            const list = this.state.matches.filter((match) => {
                return match.result === status
            });

            this.setState({
                filterMatches: status === 'All' ? this.state.matches : list,
                statusFilter: 'All',
                resultFilter: status
            })
        }
    }

    componentDidMount() {
        matches.once('value').then(snapshot => {
            const matches = dbLoop(snapshot);

            this.setState({
                isLoading: false,
                matches: matches,
                filterMatches: matches
            });
        });
    }

    render() {
        return (
            <div className="the_matches_container">
                <div className="the_matches_wrapper">
                    <div className="left">
                        <div className="match_filters">
                            <div className="match_filters_box">
                                <div className="tag">
                                    Show Match:
                                </div>
                                <div className="cont">
                                    <div className={`option ${this.state.statusFilter === 'All' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('All', 'status')}>
                                        All
                                    </div>
                                    <div className={`option ${this.state.statusFilter === 'Yes' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('Yes', 'status')}>
                                        Played
                                    </div>
                                    <div className={`option ${this.state.statusFilter === 'No' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('No', 'status')}>
                                        Not played
                                    </div>
                                </div>
                            </div>
                            <div className="match_filters_box">
                                <div className="tag">
                                    Result:
                                </div>
                                <div className="cont">
                                    <div className={`option ${this.state.resultFilter === 'All' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('All', 'result')}>
                                        All
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'W' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('W', 'result')}>
                                        W
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'L' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('L', 'result')}>
                                        L
                                    </div>
                                    <div className={`option ${this.state.resultFilter === 'D' ? 'active' : ''}`} onClick={() => this.ShowMatchesByFilter('D', 'result')}>
                                        D
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MatchesList match={this.state.filterMatches} />
                    </div>
                    <div className="right">
                        <LeagueTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default TheMatches;