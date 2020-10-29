import React from 'react';

const Alert = ({children, color}) => {
    return (
        <div style={{width: '98%', padding: 5, backgroundColor: color, margin: 5, color: '#fff', borderRadius: 5}}>  
            {children}
        </div>
    )
}

export default Alert;