import React from 'react';
import ReactDOM from 'react-dom';

const rootDiv = (id: string) => {
    const div = document.createElement('div');
    div.id = id;
    return div;
}

const appElement = rootDiv('app');
document.body.appendChild(appElement);

ReactDOM.render(<span>Hola món!</span>, appElement);
