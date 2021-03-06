import React from 'react';
import {Tag} from '../../UI/misc';
import Blocks from './Blocks';

const MatchesHome = (props) => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag bck="#0e1731" size="50px" color="#ffffff">
                    Matches
                </Tag>
                <Blocks/>
                <Tag bck="#ffffff" size="22px" color="#0e1731" link={true} linkTo="the_matches">
                    See more
                </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;