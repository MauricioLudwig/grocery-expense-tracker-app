import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    AsyncStorage
} from 'react-native';
import { material } from 'react-native-typography';

import Line from './Line';
import Pie from './Pie';

export default class Charts extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    state = {
        expenses: []
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        this.getData();
    }

    onNavigatorEvent(event) {
        if (event.id === 'bottomTabSelected') {
            this.getData();
        }
    }

    async getData() {
        try {
            let data = await AsyncStorage.getItem('@LocalStorage:key');
            if (!data) {
                data = [];
            } else {
                data = JSON.parse(data);
            }
            this.setState({
                expenses: data
            });
        } catch (error) {
            alert('Could not fetch data from local storage');
        };
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.expenses.length > 0 && this.state.expenses.map((item) => (<Text key={item.expense}>{item.expense}</Text>))}
                <View style={styles.card}>
                    <Text style={material.caption}>Monthly Overview</Text>
                    <Line data={[1, 2, 3, 1]} />
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