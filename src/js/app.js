import React from 'react';
import ReactDOM from 'react-dom';

import Hello from '../components/Hello';
import Life from '../components/Life';
import ClickEvent from '../components/ClickEvent';

var obj={
    a:"dfdfd",
    b:565,
    c:"dfsdfd",
    d:89809
}

ReactDOM.render(
    <div>
        <ClickEvent/>
    </div>,
    document.getElementById('app')
);