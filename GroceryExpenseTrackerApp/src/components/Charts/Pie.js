import React from 'react';
import { Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

export default class Pie extends React.PureComponent {

    render() {

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        let pieData = this.props.data
            .filter(o => o.sum > 0)
            .map(m => ({
                value: Number(m.sum),
                svg: {
                    fill: randomColor(),
                    onPress: () => console.log('press', m.month)
                },
                key: `pie-${m.month}`
            }));

        return (
            <PieChart
                style={{ height: 200 }}
                data={pieData}
            />
        );
    };

};