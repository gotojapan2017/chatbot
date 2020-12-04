import React from 'react';
import {Answer} from './index';

const AnswersList = (props) => {
    return(
        <React.Fragment>
            <div className="c-grid__answer">
                {props.answers.map((value,index) => {
                    return <Answer content={value.content} key={index.toString()}/>
                })}
                <Answer content="phuoclv"/>
            </div>
        </React.Fragment>
    )
}

export default AnswersList;