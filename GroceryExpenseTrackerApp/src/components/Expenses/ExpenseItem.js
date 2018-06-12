import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    ToastAndroid
} from 'react-native';
import { material } from 'react-native-typography';

import { deleteExpense } from '../../database/realm';

export default class ExpenseItem extends Component {

    launchAlert = () => {
        Alert.alert(
            'Delete Expense?',
            'This action is irreversible.',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
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

        ToastAndroid.show('Expense was deleted.', ToastAndroid.SHORT);
    };

    render() {

        const shortDate = `${this.props.item.year}-${this.props.item.month}-${this.props.item.day}`;
        const itemBackground = this.props.itemIndex % 2 == 0 ? "#455A64" : "#607D8B";

        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: itemBackground
                }}
                onPress={() => this.launchAlert()}
            >
                <Text style={material.body2White}>{shortDate}</Text>
                <Text style={material.body2White}>{this.props.item.expense}</Text>
            </TouchableOpacity>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    }
});