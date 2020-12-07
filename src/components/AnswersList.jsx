import React from 'react';
import {Answer} from './index';

const AnswersList = (props) => {
    return(
        <React.Fragment>
            <div className="c-grid__answer">
                {props.answers.map((value,index) => {
                    return <Answer content={value.content} nextId={value.nextId} key={index.toString()} select={props.select} />
                })}
            </div>
        </React.Fragment>
    )
}

export default AnswersList