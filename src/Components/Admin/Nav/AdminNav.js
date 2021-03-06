import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase';

const AdminNav = (props) => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/add_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/add_player'
        }

    ]

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const showItems = () => (
        links.map(link =>(
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    const Out = () =>{
        firebase.auth().signOut().then(() =>{
            window.location.href = '/sign_in';
        })
    }

    return (
        <div>
            {showItems()}
            <ListItem button style={style} onClick={() => Out()}>
                Log out
            </ListItem>
        </div>
    );
};

export default AdminNav;