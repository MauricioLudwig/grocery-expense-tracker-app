import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import { VictoryScatter, VictoryTheme, VictoryChart } from 'victory-native';

export default class Scatter extends Component {

    render() {

        /*
        x = day
        y = sum
        */

        const data = this.props.data.map((item, index) => {
            return {
                x: item.day,
                y: item.sum
            };
        });

        return (
            <View pointerEvents="none">
                <VictoryChart
                    theme={VictoryTheme.material}
                    domain={{ x: [1, 31], y: [0, 100] }}
                >
                    <VictoryScatter
                        style={{ data: { fill: "#c43a31" } }}
                        size={3}
                        data={data}
                    />
                </VictoryChart>
            </View>
        );
    };

}