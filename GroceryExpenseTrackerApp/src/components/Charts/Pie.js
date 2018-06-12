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
            "tomato",
            "#009688",
            "#607D8B",
            "cyan",
            "navy",
            "green",
            "red",
            "purple",
            "coral",
            "skyblue",
            "brown",
            "#CDDC39",
        ];

        /*
        x = index
        y = amount/slice of pie
        label = label for amount
        */

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