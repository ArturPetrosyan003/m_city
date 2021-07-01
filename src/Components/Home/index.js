import React from 'react';
import Featured from './Featured';
import Matches from './Matches';
import Players from './MeetPlayers';
import Promotion from "./Promotion/index";

const Home = (props) => {
    return (
        <div className="bck_blue">
            <Featured/>
            <Matches/>
            <Players/>
            <Promotion/>
        </div>
    );
};

export default Home;