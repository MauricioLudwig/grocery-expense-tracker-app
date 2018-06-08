import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text
} from 'react-native';
import { material } from 'react-native-typography';

import Line from './Line';
import Pie from './Pie';

export default class Charts extends React.Component {

    state = {
        data: []
    };

    componentWillMount() {
        this.setState({
            data: [50, 20, 10, 5, -60, 70, 100, 2, 10, 5]
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={material.caption}>Monthly Overview</Text>
                    <Line data={this.state.data} />
                </View>
                <View style={styles.card}>
                    <Text style={material.caption}>Yearly Overview</Text>
                    <Pie />
                </View>
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#eee',
        margin: 10,
        padding: 10
    }
});