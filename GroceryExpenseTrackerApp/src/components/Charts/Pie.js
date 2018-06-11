import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';

export default class Pie extends Component {

    render() {

        const colors = [
            "tomato",
            "orange",
            "gold",
            "cyan",
            "navy",
            "green",
            "red",
            "yellow",
            "coral",
            "skyblue",
            "brown",
            "pink",
        ];

        // x = index
        // y = amount
        // label = label for the amount

        const data = this.props.data.map((item) => {
            return {
                x: item.monthValue,
                y: item.sum,
                label: `${item.monthLabel} (${item.sum})`
            }
        });

        return (
            <VictoryPie
                width={500}
                colorScale={colors}
                data={data}
            />
        );
    };

}