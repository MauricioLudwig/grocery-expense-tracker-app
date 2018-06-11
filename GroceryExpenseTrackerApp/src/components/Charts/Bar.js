import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryBar, VictoryTheme, VictoryChart } from 'victory-native';

export default class Bar extends Component {

    render() {

        const data = this.props.data.map(item => {
            return {
                x: item.day,
                y: item.expense
            }
        });

        return (
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={10}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            >
                <VictoryBar
                    style={{ data: { fill: '#c43a31' } }}
                    data={data}
                />
            </VictoryChart>
        );
    }

}