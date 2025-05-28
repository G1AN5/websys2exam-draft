// src/components/MultipleChoice.js - Only showing relevant style changes

import React from 'react';

function MultipleChoice({ questionNumber, question, choices, currentAnswer, setAnswer }) {
    const questionStyle = {
        fontSize: '1.4em', // Slightly smaller font for question
        fontWeight: 'bold',
        marginBottom: '18px', // Adjusted margin
        color: '#333',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
    };

    const choiceContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '12px', // Slightly smaller gap
        marginBottom: '18px', // Adjusted margin
        boxSizing: 'border-box',
    };

    const choiceStyle = {
        backgroundColor: '#fff',
        padding: '12px 18px', // Slightly less padding
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
        textAlign: 'left',
        border: '1px solid #eee',
        boxSizing: 'border-box',
        fontSize: '1.0em', // Slightly smaller font for choices
        color: '#555',
    };

    const selectedChoiceStyle = {
        ...choiceStyle,
        backgroundColor: '#dcebf2',
        border: '1px solid #a7c5d9',
        fontWeight: 'bold',
        color: '#333',
    };

    return (
        <div style={{ width: '100%' }}>
            <p style={questionStyle}>Q{questionNumber}: {question}</p>
            <div style={choiceContainerStyle}>
                {choices.map((choice) => (
                    <div
                        key={choice.id}
                        style={currentAnswer === choice.id ? selectedChoiceStyle : choiceStyle}
                        onClick={() => setAnswer(choice.id)}
                        onMouseEnter={(e) => {
                            if (currentAnswer !== choice.id) {
                                e.currentTarget.style.backgroundColor = '#f5f5f5';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentAnswer !== choice.id) {
                                e.currentTarget.style.backgroundColor = '#fff';
                            }
                        }}
                    >
                        {choice.value}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MultipleChoice;