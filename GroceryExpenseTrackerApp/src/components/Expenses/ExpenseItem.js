import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { deleteExpense } from '../../database/realm';

export default class ExpenseItem extends React.Component {

    launchAlert = () => {
        Alert.alert(
            'Delete Expense?',
            'This action is irreversible.',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => this.deleteExpenseHandler(),
                }
            ],
            { cancelable: true }
        );
    };

    deleteExpenseHandler = () => {
        deleteExpense(this.props.item.id)
            .then()
            .catch(error => {
                alert('Unable to delete item.');
            });
    };

    render() {

        const shortDate = `${this.props.item.year}-${this.props.item.month}-${this.props.item.day}`;

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.launchAlert()}
            >
                <Text>{shortDate}</Text>
                <Text>{this.props.item.expense}</Text>
            </TouchableOpacity>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    }
});