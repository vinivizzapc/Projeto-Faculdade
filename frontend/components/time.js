import React, { Component } from 'react';
import { Text } from 'native-base';
import moment from 'moment';

class Time extends Component {

    constructor(props) {
        super(props);
        this.date = props.time;
    }

    render() {
        const time = moment( this.date || moment.now() ).fromNow();

        return (
            <Text  note style={{marginHorizontal:0, toLocaleString:'BR'}}>{time}</Text>
        );
    }
}

export default Time;