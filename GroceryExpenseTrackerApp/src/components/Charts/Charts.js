import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    AsyncStorage
} from 'react-native';
import { Card } from 'react-native-elements';

// App components
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
                <Card title="Month Overview">
                    <Line data={[1, 2, 3, 1]} />
                </Card>
                <Card title="Year Overview">
                    <Pie />
                </Card>
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});