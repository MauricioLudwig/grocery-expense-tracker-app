import React from 'react';
import { StyleSheet } from 'react-native';
import { LineChart, Path, Grid } from 'react-native-svg-charts';

export default class Line extends React.PureComponent {

    render() {

        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )

        return (
            <LineChart
                style={styles.chart}
                data={this.props.data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
                <Shadow />
            </LineChart>
        );
    };

};

const styles = StyleSheet.create({
    chart: {
        height: 200
    }
});