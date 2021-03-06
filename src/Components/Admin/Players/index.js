import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/Adminlayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { players } from '../../../firebase';
import { dbLoop } from '../../UI/misc';

class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount() {
        players.once('value').then((snapshot) => {
            const players = dbLoop(snapshot);
            this.setState({
                isLoading: false,
                players: players
            })
        });
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Last name</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.state.players ?
                                    this.state.players.map((player, i) =>(
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Link to={`/admin_players/edit_player/${player.id}`}>
                                                    {player.name}
                                                </Link> 
                                            </TableCell>
                                            <TableCell>
                                               {player.lastname}
                                            </TableCell>
                                            <TableCell>
                                                {player.number}
                                            </TableCell>
                                            <TableCell>
                                                {player.position}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <div className="admin_progress">
                        { this.state.isLoading ?
                            <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                            :null
                        }
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
        
export default AdminPlayers;