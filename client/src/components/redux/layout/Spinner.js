import React, { Fragment } from 'react';
import gif from './gif.gif';

export default () => (
    <Fragment>
        <img 
        src={gif}
        style={{ width: '200px', margin: 'auto', display: 'block'}}
        alt="Loading..." />
    </Fragment>
);