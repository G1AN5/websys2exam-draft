// src/App.js

import React, { useState } from 'react';

import MultipleChoice from './components/MultipleChoice';
import TrueOrFalse from './components/TrueOrFalse';
import Identification from './components/Identification';
import questions from './questions.json'; // Assuming react_questions.json is named questions.json

function App() {
    // Use React's useState for state management
    const [userName, setUserName] = useState('');
    const [totalScore, setTotalScore] = useState(0);
    const [counter, setCounter] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [textInputAnswer, setTextInputAnswer] = useState('');
    // Use null for initial, true for taking exam, false for exam finished
    const [takingExam, setTakingExam] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const trueOrFalseChoices = [
        { id: true, value: 'True' },
        { id: false, value: 'False' },
    ];

    // currentQuestion is derived from state, no need to define it as a separate state variable
    const currentQuestion = questions[counter];

    const HandleNext = () => {
        // Save current identification answer before moving to next question
        if (currentQuestion.type === 'identification') {
            const newAnswers = [...answers];
            newAnswers[counter] = textInputAnswer;
            setAnswers(newAnswers);
        }

        if (counter < questions.length - 1) {
            setCounter(counter + 1);
            // Load answer for the next question, or empty string if no answer
            setTextInputAnswer(answers[counter + 1] || '');
        } else {
            // If it's the last question, submit the exam
            HandleSubmit();
        }
    };

    const HandlePrev = () => {
        // Save current identification answer before moving to previous question
        if (currentQuestion.type === 'identification') {
            const newAnswers = [...answers];
            newAnswers[counter] = textInputAnswer;
            setAnswers(newAnswers);
        }

        if (counter > 0) {
            setCounter(counter - 1);
            // Load answer for the previous question, or empty string if no answer
            setTextInputAnswer(answers[counter - 1] || '');
        }
    };

    const HandleSubmit = () => {
        // Use window.confirm for user confirmation
        const isConfirmed = window.confirm('You are to submit exam! Are you sure you want to proceed?');

        if (isConfirmed) { // Check if the user confirmed
            let score = 0;
            questions.forEach((q, index) => { // Iterate through questions and answers
                const userAnswer = answers[index];
                let isCorrect = false;

                if (q.type === 'identification') {
                    if (userAnswer && typeof userAnswer === 'string') {
                        isCorrect = userAnswer.trim().toLowerCase() === q.answer.toLowerCase();
                    }
                } else if (q.type === 'multiple') {
                    isCorrect = userAnswer === q.answer;
                } else if (q.type === 'binary') {
                    isCorrect = userAnswer === q.answer;
                }

                if (isCorrect) {
                    score++;
                }
            });
            setTotalScore(score);
            setTakingExam(false); // Set state to indicate exam is finished
        }
    };

    const setAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[counter] = answer;
        setAnswers(newAnswers);
    };

    const setTextInput = (event) => {
        setTextInputAnswer(event.target.value);
        const newAnswers = [...answers];
        newAnswers[counter] = event.target.value;
        setAnswers(newAnswers);
    };

    const getUserName = () => {
        // Only proceed if userName is not empty
        if (userName.trim() !== '') {
            setTakingExam(true); // Start the exam
        } else {
            alert('Please enter your name to start the exam.');
        }
    };

    const selectQuestionFromNav = (index) => {
        // Save current identification answer if navigating via sidebar
        if (currentQuestion.type === 'identification') {
            const newAnswers = [...answers];
            newAnswers[counter] = textInputAnswer;
            setAnswers(newAnswers);
        }

        setCounter(index); // Navigate to selected question
        setTextInputAnswer(answers[index] || ''); // Load answer for selected question
        setShowSidebar(false); // Close sidebar after selection
    };

    // Inline Styles (as per previous working version)
    const headerStyle = {
        width: '100vw',
        height: '60px',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 100,
    };

    const headerLeftStyle = {
        fontFamily: 'Georgia, serif',
        fontSize: '24px', // Fixed font size in pixels
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        top: '20px',
        left: '30px',
        zIndex: 101,
    };

    const headerCenterStyle = {
        backgroundColor: '#f7e1b7',
        padding: '10px 20px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        fontSize: '20px', // Fixed font size in pixels
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Roboto, Arial, sans-serif',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '20px',
        zIndex: 101,
    };

    const hamburgerIconStyle = {
        fontSize: '32px', // Fixed font size in pixels
        cursor: 'pointer',
        color: '#333',
        position: 'absolute',
        top: '20px',
        right: '30px',
        zIndex: 1001,
    };

    const quizBoxStyle = {
        backgroundColor: '#f0f6f9',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '60vw',
        height: '500px', // Set a FIXED HEIGHT for the overall quiz box
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: '#333',
        position: 'relative',
        zIndex: 100,
        overflowX: 'hidden',
        boxSizing: 'border-box',
    };

    const navButtonsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 'auto', // Pushes buttons to the bottom
        paddingTop: '20px',
        borderTop: '1px solid #eee',
        flexShrink: 0, // Prevents buttons from shrinking
        boxSizing: 'border-box',
        // Approximate height of this container (padding-top + button height + margins)
        // This will be used to calculate the remaining height for the content area
        // Adjust '70px' if your buttons or padding are different
        minHeight: '70px',
    };

    const questionContentAreaStyle = {
        flexGrow: 1, // Allows this div to take up available space
        width: '100%',
        // Calculate height: total quizBox height - (top padding + bottom padding + navButtonsContainer height)
        height: `calc(100% - ${30 + 30 + 70}px)`, // 30px top padding + 30px bottom padding of quizBox + 70px for navButtonsContainer
        overflowY: 'auto', // THIS is where the scrollbar will appear if content overflows
        paddingRight: '15px', // Add padding to prevent text from touching scrollbar
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    };

    const welcomeScreenInputStyle = {
        width: '80%',
        padding: '12px',
        marginBottom: '25px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '18px', // Fixed font size
        boxSizing: 'border-box',
        textAlign: 'center',
    };

    const welcomeScreenButtonStyle = {
        padding: '12px 30px',
        fontSize: '18px', // Fixed font size
    };

    const welcomeScreenContentStyle = {
        textAlign: 'center',
        padding: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        overflowX: 'hidden',
        boxSizing: 'border-box',
        // To make sure welcome screen also fits within questionContentAreaStyle
        height: `calc(100% - ${30 + 30 + 70}px)`, // Match questionContentAreaStyle height
    };

    const quizCompletedContentStyle = {
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        overflowX: 'hidden',
        boxSizing: 'border-box',
        // To make sure results screen also fits within questionContentAreaStyle
        height: `calc(100% - ${30 + 30 + 70}px)`, // Match questionContentAreaStyle height
    };

    const examContent = () => {
        // If not taking exam (initial state)
        if (takingExam === null) {
            return (
                <div style={welcomeScreenContentStyle}> {/* Apply the new style here */}
                    <h2 style={{ color: '#333', marginBottom: '25px', fontSize: '2em' }}>Welcome to the Exam!</h2>
                    <input
                        type="text"
                        placeholder="Input name here:"
                        id="userNameTxtBx"
                        value={userName} // Controlled component
                        onChange={(e) => setUserName(e.target.value)} // Update userName state
                        style={welcomeScreenInputStyle}
                    />
                    <button onClick={getUserName} style={welcomeScreenButtonStyle}>
                        Submit Name
                    </button>
                </div>
            );
        }

        // If exam is finished
        if (takingExam === false) {
            return (
                // Apply the quizCompletedContentStyle here
                <div style={quizCompletedContentStyle}>
                    <h2 style={{ fontSize: '28px', color: '#28a745', fontWeight: 'bold', marginBottom: '20px' }}>
                        Quiz Completed!
                    </h2>
                    <p style={{ fontSize: '20px', marginBottom: '30px', color: '#555' }}>
                        {userName}, your score is: {totalScore} out of {questions.length} questions correctly.
                    </p>
                    <button
                        onClick={() => {
                            // Reset all state for restarting the exam
                            setUserName('');
                            setTotalScore(0);
                            setCounter(0);
                            setAnswers(Array(questions.length).fill(null));
                            setTextInputAnswer('');
                            setTakingExam(null);
                            setShowSidebar(false);
                        }}
                        style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#28a745', color: 'white' }}
                    >
                        Restart Exam
                    </button>
                </div>
            );
        }

        // If taking exam (actual questions)
        switch (currentQuestion.type) {
            case 'multiple':
                return (
                    <MultipleChoice
                        questionNumber={counter + 1}
                        question={currentQuestion.question}
                        choices={currentQuestion.choices}
                        currentAnswer={answers[counter]}
                        setAnswer={setAnswer}
                    />
                );
            case 'binary':
                return (
                    <TrueOrFalse
                        questionNumber={counter + 1}
                        question={currentQuestion.question}
                        choices={trueOrFalseChoices}
                        currentAnswer={answers[counter]}
                        setAnswer={setAnswer}
                    />
                );
            case 'identification':
                return (
                    <Identification
                        questionNumber={counter + 1}
                        question={currentQuestion.question}
                        currentAnswer={textInputAnswer} // Pass the controlled text input state
                        setTextInput={setTextInput}
                    />
                );
            default:
                return <div>Question type not supported.</div>;
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Aesthetic background circles */}
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>
            <div className="circle-blob"></div>

            {/* Overlay for when sidebar is open */}
            <div className={`overlay ${showSidebar ? 'open' : ''}`} onClick={() => setShowSidebar(false)}></div>

            {/* Header with absolute positioning for elements */}
            <div style={headerStyle}>
                <div style={headerLeftStyle}>DevSyndicate</div>
                <div style={headerCenterStyle}>WEBSYSTEMS 2 EXAM</div>
                <div style={hamburgerIconStyle} onClick={() => setShowSidebar(!showSidebar)}>☰</div>
            </div>

            {/* Quiz Box - centered by its flex parent */}
            <div style={quizBoxStyle}>
                {/* New div for scrollable content */}
                <div style={questionContentAreaStyle}>
                    {examContent()}
                </div>

                {/* Only show navigation buttons if exam is ongoing and not showing results */}
                {takingExam === true && (
                    <div style={navButtonsContainerStyle}>
                        <button onClick={HandlePrev} disabled={counter === 0}>
                            BACK
                        </button>
                        {counter === questions.length - 1 ? (
                            <button onClick={HandleNext}>SUBMIT EXAM</button>
                        ) : (
                            <button onClick={HandleNext}>NEXT</button>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar Navigation */}
            <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <button className="sidebar-close-btn" onClick={() => setShowSidebar(false)}>X</button>
                </div>
                <ul className="sidebar-nav-list">
                    {questions.map((q, index) => (
                        <li className="sidebar-nav-item" key={q.id}>
                            <button
                                onClick={() => selectQuestionFromNav(index)}
                                className={counter === index ? 'active' : ''}
                            >
                                Question {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;