import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = <div style={{ background: props.bck, fontSize: props.size, color: props.color, padding: '5px 10px', display: 'inline-block', fontFamily: 'Righteous', ...props.add }}>{props.children}</div>

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    }
    else {
        return template;
    }
}

export const dbLoop = (snapshot, reverse = true) => {
    const data = [];
    const reversedData = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    if (reverse) {
        for (let i = data.length - 1; i >= 0; i--) {
            reversedData.push(data[i]);
        }
        return reversedData;
    }
    else{
        return data;
    }
}