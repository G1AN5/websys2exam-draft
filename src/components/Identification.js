import React from 'react';

function Identification({ questionNumber, question, currentAnswer, setTextInput }) {
    const questionStyle = {
        fontSize: '1.4em', 
        fontWeight: 'bold',
        marginBottom: '18px', 
        color: '#333',
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px', 
        fontSize: '1.0em', 
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
        marginBottom: '18px', 
    };

    return (
        <div style={{ width: '100%' }}>
            <p style={questionStyle}>Q{questionNumber}: {question}</p>
            <input
                type="text"
                value={currentAnswer}
                onChange={setTextInput}
                placeholder="Input Answer Here"
                style={inputStyle}
            />
        </div>
    );
}

export default Identification;
