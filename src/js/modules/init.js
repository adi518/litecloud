/* jshint: esversion: 6 */

import React from 'react';
import Menu from './menu';
import Player from './player';

export default class Init extends React.Component {
    render() {
        return(
            <div>
                <Menu />
                <Player />
            </div>
        );
    }
}
