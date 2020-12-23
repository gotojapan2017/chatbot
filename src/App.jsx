import React, { useState, useEffect, useCallback } from 'react';
import './assets/styles/style.css';
import {AnswersList, Chats} from './components/index';
import FormDialog from './components/Forms/FormDialog';
import {db} from './firebase/index';

const App =() => {

    const [answers, setAnswers] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentId, setCurrentId] = useState("init");
    const [dataset, setDataset] = useState({});
    const [open, setOpen] = useState(false);

    const addChats = (chat) => {
        setChats(prevChats => {
            return [...prevChats, chat];
        })
    }

    const displayNextQuestion = (nextQuestionId, nextDataset) => {
        addChats({
            text: nextDataset.question,
            type: 'question'
        })
        setCurrentId(nextQuestionId);
        setAnswers(nextDataset.answers);
    }

    const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
        switch(true) {
            case (nextQuestionId === 'contact'):
                handleClickOpen();
                break;
            case (/^https:*/.test(nextQuestionId)):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;
            default:
                addChats({
                    text: selectedAnswer,
                    type: 'answer'
                })
                setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),1000);
                break;
        }
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = useCallback(() => {
        setOpen(false);
    },[setOpen])

    const initDataset = (dataset) => {
        setDataset(dataset);
    }

    useEffect(() => {   
        (async() => {
            await db.collection('questions').get().then(snapshots => {
                snapshots.forEach(doc => {
                    dataset[doc.id] = doc.data();
                })
            })
            initDataset(dataset);
            displayNextQuestion(currentId, dataset[currentId]);
        })()
    }, [])

    useEffect(() => {
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    })

    return(
        <React.Fragment>
            <section className="c-section">
                <div className="c-box">
                    <Chats chats={chats} />
                    <AnswersList answers={answers} select={selectAnswer} />
                    <FormDialog open={open} handleClose={handleClose} />
                </div>  
            </section>
        </React.Fragment>
    )
}

export default App