import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    Alert,
    ToastAndroid
} from 'react-native';
import { material } from 'react-native-typography';
import { Icon } from 'react-native-elements';
import { appColors } from '../../styling';

import { deleteExpense } from '../../database/realm';

export default class ExpenseItem extends Component {

    launchDeleteAlert = () => {
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
            >
                <Text style={material.body2White}>{shortDate}</Text>
                <Text style={material.body2White}>{this.props.item.expense}</Text>
                <Icon
                    raised
                    name="md-trash"
                    color={appColors.btnInfo}
                    type="ionicon"
                    onPress={() => this.launchDeleteAlert()}
                />
            </TouchableOpacity>
        );
    };

};