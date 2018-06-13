import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card, Divider } from 'react-native-elements';

import ExpenseList from '../Expenses/ExpenseList';
import { appColors } from '../../styling';
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
        budget: null,
        sumOfExpenses: null,
        balance: null,
        ratio: null
    };

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: appColors.toolbarColor,
        navBarBackgroundColor: appColors.toolbarBackgroundColor,
        statusBarColor: appColors.statusBarColor
    };

    constructor(props) {
        super(props);

        this.reloadData();
        Realm.addListener('change', () => {
            this.reloadData();
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'bottomTabSelected') {
            this.getBudget();
        }
    }

    reloadData = () => {
        getExpenses().then((res) => {
            this.setState({ expenses: res })
        }).catch((error) => {
            this.setState({ expenses: [] })
        });

        this.getBudget();
    };

    getBudget = () => {
        this.getBudgetFromLocalStore()
            .then(res => {
                this.setState({
                    budget: res
                }, this.getMonthExpenses())
            }).catch(error => {
                alert('Unable to fetch data');
            });
    };

    getMonthExpenses = () => {
        getSumOfMonthExpenses().then(res => {
            this.setState({
                sumOfExpenses: res
            });

            let balance;

            if (this.state.budget && this.state.sumOfExpenses) {
                balance = this.state.budget - this.state.sumOfExpenses;
                this.setState({
                    balance: balance
                }, () => {
                    if (balance > 0) {
                        this.calculateBudgetRatio();
                    } else {
                        this.setState({
                            ratio: null
                        });
                    }
                });
            } else {
                this.setState({
                    balance: null,
                    ratio: null
                });
            };
        }).catch(error => {
            alert('Unable to fetch data');
        });
    };

    calculateBudgetRatio = () => {
        let today = new Date();
        let days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        let dayToday = today.getDate();
        let daysRemaining = days - (dayToday - 1);
        let ratio = (this.state.balance / daysRemaining).toFixed(2);
        this.setState({
            ratio: ratio
        });
    };

    async getBudgetFromLocalStore() {
        try {
            const value = await AsyncStorage.getItem('@BudgetKey:key');
            return value;
        } catch (error) {
            alert('Error retrieving value');
        };
    };

    launchAddExpenseScreen = () => {
        this.props.navigator.push({
            screen: 'groceryexpensetracker.AddExpenseScreen',
            title: 'Add New Expense'
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
                        <Text>{this.state.budget ? `Current budget: ${this.state.budget}` : 'No budget has been set.'}</Text>
                        <Text>{this.state.sumOfExpenses ? `Sum of expenses this month: ${this.state.sumOfExpenses}` : 'You have no expenses for this month.'}</Text>
                        {this.state.balance ? <Text>{`Balance: ${this.state.balance}`}</Text> : <Text></Text>}
                        {this.state.ratio ? <Text>{`In order to keep track with your budget this month you can spend a total of ${this.state.ratio} per day.`}</Text> : <Text></Text>}
                    </Card>
                </View>
                <View style={styles.listContainer}>
                    {this.state.expenses.length > 0
                        ? expensesList
                        : emptyList
                    }
                </View>
                <Button
                    color={appColors.btnPrimary}
                    title="Add Expense"
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