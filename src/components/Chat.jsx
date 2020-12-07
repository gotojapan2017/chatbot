import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Phuoclv from '../assets/img/phuoclv.png';
import NoProfile from '../assets/img/no-profile.png';

const Chat = (props) => {
    const isQuestion = (props.type === 'question');
    const classes = isQuestion ? 'p-chat__row' : 'p-chat__reverse';
    return(
        <React.Fragment>
            <ListItem className={classes}>
                <ListItemAvatar>
                    {isQuestion ? 
                        (<Avatar alt="icon" src={Phuoclv} />)
                      : (<Avatar alt="icon" src={NoProfile} />)}
                </ListItemAvatar>
                <div className="p-chat__bubble">
                    {props.text}
                </div>
            </ListItem>
        </React.Fragment>
    )
}

export default Chat