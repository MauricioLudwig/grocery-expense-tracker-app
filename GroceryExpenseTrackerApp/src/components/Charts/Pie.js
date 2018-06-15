import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { VictoryPie } from 'victory-native';
import { Card } from 'react-native-elements';

export default class Pie extends Component {

    render() {

        const colors = [
            "#ef9a9a", // 1
            "#FFCC80", // 2
            "#CE93D8", // 3
            "#AED581", // 4
            "#4FC3F7", // 5
            "#FFEB3B", // 6
            "tomato",  // 7
            "#80DEEA", // 8
            "#C8E6C9", // 9
            "#BCAAA4", // 10
            "#FF9800", // 11
            "#80CBC4", // 12
        ];

        // x     = index
        // y     = amount/slice of pie
        // label = label for amount 

        const data = this.props.data.map((item) => {
            return {
                x: item.monthValue,
                y: item.sum,
                label: item.sum
            };
        });

        const monthLabels = this.props.data.map((item, index) => {
            let monthLabelColor = colors[index];
            return (
                <Text
                    style={{ marginBottom: 5, color: monthLabelColor }}
                    key={index}
                >
                    {`${item.monthLabel} (${item.sum})`}
                </Text>
            );
        });

        return (
            <ScrollView
                horizontal={true}
            >
                <View style={styles.containerView}>
                    <Card>
                        {monthLabels}
                    </Card>
                </View>
                <View
                    pointerEvents="none"
                >
                    <VictoryPie
                        colorScale={colors}
                        data={data}
                    />
                </View>
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    containerView: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});