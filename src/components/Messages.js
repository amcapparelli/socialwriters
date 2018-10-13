import React from 'react';


export const GetMessages = ({messages}) => 
messages&&
    messages.map(message => {
        return(
            <li key={message}>{message}</li>
        )
    }) || null

export default GetMessages