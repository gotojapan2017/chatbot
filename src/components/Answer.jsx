import React from 'react';
import Button from '@material-ui/core/Button';

const Answer = (props) => {
    return (
        <React.Fragment>
            <Button variant="contained" color="primary">{props.content}</Button>
        </React.Fragment>
    )
}

export default Answer;