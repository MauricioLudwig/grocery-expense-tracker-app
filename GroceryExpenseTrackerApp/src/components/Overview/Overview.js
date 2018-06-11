import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';

import ExpenseList from '../Expenses/ExpenseList';
import { toolbarColor, btnColor } from '../../styling';
import { getMonths, getYears } from '../../constants';
import Realm, { getExpenses } from '../../database/realm';

export default class Overview extends Component {

    state = {
        expenses: [],
    };

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    constructor(props) {
        super(props);

        this.reloadData();
        Realm.addListener('change', () => {
            this.reloadData();
        });
    }

    reloadData = () => {
        getExpenses().then((res) => {
            this.setState({ expenses: res })
        }).catch((error) => {
            this.setState({ expenses: [] })
        });
    };

    launchAddExpenseScreen = () => {
        this.props.navigator.push({
            screen: 'groceryexpensetracker.AddExpenseScreen',
            title: 'Add New Expense',
            animated: true,
            animationType: 'slide-horizontal'
        });
    };

    render() {

        const expensesList = (
            <View style={styles.expensesListView}>
                <ExpenseList expenses={this.state.expenses} />
            </View>
        );

        const emptyList = (
            <View style={styles.emptyListView}>
                <Card>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon style={{ paddingRight: 10 }} name="alert-circle" size={25} />
                        <Text style={styles.emptyListText}>There are no expenses to display.</Text>
                    </View>
                </Card>
            </View>
        );

        return (
            <View style={styles.container}>
                <View>
                    <Card>
                        <Text>Budget: (todo)</Text>
                        <Text>Sum of expenses this month: (todo)</Text>
                        <Text>Budget conclusion (todo)</Text>
                    </Card>
                </View>
                <View style={styles.listContainer}>
                    {this.state.expenses.length > 0
                        ? expensesList
                        : emptyList
                    }
                </View>
                <Button
                    color={btnColor('accent')}
                    title="Add Expense"
                    onPress={() => this.launchAddExpenseScreen()}
                />
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
    },
    expensesListView: {
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: '#d6d6d6',
        flex: 1
    },
    emptyListView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16
    }
});