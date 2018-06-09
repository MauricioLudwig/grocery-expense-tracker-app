import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';

export default class ExpenseItem extends React.Component {

    render() {

        const shortDate = `${this.props.item.year}-${this.props.item.month}-${this.props.item.day}`;

        return (
            <Card style={{ backgroundColor: 'blue'}}>
                <TouchableOpacity style={styles.container}>
                    <Text>{shortDate}</Text>
                    <Text>{this.props.item.expense}</Text>
                </TouchableOpacity>
            </Card>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#fff',
    }
});