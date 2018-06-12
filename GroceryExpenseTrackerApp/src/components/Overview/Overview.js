import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import ExpenseList from '../Expenses/ExpenseList';
import { appColors, btnColor } from '../../styling';
import Realm, { getExpenses, getSumOfMonthExpenses } from '../../database/realm';

export default class Overview extends Component {

    /*
    budget: {
        value: ,
        sum: ,
        balance: ,
        conclusion: 
        currentMonth: ,
        currentYear: ,       
    }
    */

    state = {
        expenses: [],
        budget: {}
    };

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: appColors.toolbarColor,
        navBarBackgroundColor: appColors.toolbarBackgroundColor
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

        getSumOfMonthExpenses().then(res => {
            
        }).catch(error => {
            
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
                <Card title="Expenses">
                    <Text>Below is a list of your recent expenses, capped at 100 entries. Click an item to delete.</Text>
                </Card>
                <Divider style={styles.divider} />
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
                    <Card title="Budget Overview">
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
                <ActionButton
                    buttonColor='#69b0c6'
                    onPress={() => this.launchAddExpenseScreen()}
                />
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.backgroundColor
    },
    listContainer: {
        flex: 1,
    },
    expensesListView: {
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
    },
    divider: {
        marginTop: 15,
        height: 3
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    }
});