import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

import ExpenseList from '../Expenses/ExpenseList';
import { toolbarColor, btnColor } from '../../styling/styling';
import { getMonths, getYears } from '../../constants';

export default class Overview extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    state = {
        expenses: [],
        selectedYear: '',
        selectedMonth: '',
        budget: '',
        currentMonthExpenses: 0,
        budgetExceeded: false,
        budgetBalance: 0,
        daysRemaining: 0,
        dayBudgetRatio: 0
    };

    componentWillMount() {

        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = (today.getMonth() + 1);
        let currentDay = today.getDate();
        let remaining = 0;

        this.setState({
            selectedYear: currentYear,
            selectedMonth: currentMonth
        }, this.updateListData());

        this.getBudget()
            .then(res => {
                this.setState({
                    budget: res
                });
            });

        this.getData()
            .then(res => {
                if (res.length > 0) {
                    let expenses = res
                        .filter(o => o.month == currentMonth && o.year == currentYear)
                        .map(m => m.expense);

                    let totalExpenses = 0;
                    for (let i = 0; i < expenses.length; i++) {
                        totalExpenses += Number(expenses[i]);
                    }
                    this.setState({
                        currentMonthExpenses: totalExpenses
                    });
                }
            })
            .then(() => {
                remaining = this.state.budget - this.state.currentMonthExpenses;
                if (remaining >= 0) {
                    this.setState({
                        budgetExceeded: false,
                        budgetBalance: remaining
                    });
                } else {
                    this.setState({
                        budgetExceeded: true,
                        budgetBalance: remaining
                    });
                }
            })
            .then(() => {
                if (!this.state.budgetExceeded) {
                    let totalDays = new Date(currentYear, currentMonth, 0).getDate();
                    let daysRemaining = (totalDays - (currentDay - 1));
                    let dayBudgetRatio = (remaining / daysRemaining).toFixed(2);
                    this.setState({
                        daysRemaining: daysRemaining,
                        dayBudgetRatio: dayBudgetRatio
                    });
                }
            });
    };

    updateListData = () => {
        this.getData()
            .then((res) => {
                let data = res
                    .filter(o => (o.month == this.state.selectedMonth && o.year == this.state.selectedYear))
                    .map(m => m);
                this.setState({
                    expenses: data
                });
            });
    }

    async getBudget() {
        try {
            let budget = await AsyncStorage.getItem('@MonthlyBudget:key');
            if (!budget) {
                budget = '0'
            }
            return budget;
        } catch (error) {
            alert('Could not fetch data from local storage');
        };
    }

    async getData() {
        try {
            let data = await AsyncStorage.getItem('@LocalStorage:key');
            if (!data) {
                data = [];
            } else {
                data = JSON.parse(data);
            }
            return data;
        } catch (error) {
            alert('Could not fetch data from local storage');
        };
    };

    async setData(data) {
        try {
            await AsyncStorage.setItem('@LocalStorage:key', JSON.stringify(data));
        } catch (error) {
            alert('Unable to save data to local storage');
        };
    }

    addExpenseHandler = (newExpense) => {
        this.getData()
            .then(res => {
                let data = res.concat(newExpense);
                this.setData(data)
                    .then(this.updateListData());
            });
    };

    launchAddExpenseScreen = () => {
        this.props.navigator.push({
            screen: 'groceryexpensetracker.AddExpenseScreen',
            title: 'Add New Expense',
            passProps: {
                addExpenseHandler: this.addExpenseHandler
            },
            animated: true,
            animationType: 'slide-horizontal'
        });
    };

    render() {

        const months = getMonths();
        const years = getYears();
        const budgetConclusion = this.state.budgetExceeded
            ? `You have exceeded your budget by ${this.state.budgetBalance * -1}`
            : `To keep from exceeding your budget you can spend an additional ${this.state.budgetBalance} this month or ${this.state.dayBudgetRatio} per day.`;

        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Card>
                        <Text>Budget: {this.state.budget}</Text>
                        <Text>Sum of expenses this month: {this.state.currentMonthExpenses}</Text>
                        <Text>{budgetConclusion}</Text>
                    </Card>
                </View>
                <View style={styles.bottomSection}>
                    <View style={styles.dropdownContainer}>
                        <View
                            style={styles.dropdown}
                        >
                            <Dropdown
                                onChangeText={(value) => this.setState({
                                    selectedYear: value
                                }, this.updateListData())}
                                label="Year"
                                data={years}
                                value={this.state.selectedYear}
                            />
                        </View>
                        <View
                            style={styles.dropdown}
                        >
                            <Dropdown
                                onChangeText={(value) => this.setState({
                                    selectedMonth: value
                                }, this.updateListData())}
                                label="Month"
                                data={months}
                                value={this.state.selectedMonth}
                            />
                        </View>
                    </View>
                    {this.state.expenses.length > 0
                        ? <ExpenseList expenses={this.state.expenses} launchAddExpenseScreen={this.launchAddExpenseScreen} />
                        : <Text style={styles.noRecordsText}>No records exist for this period...</Text>}
                </View>
                <Button
                    color={btnColor}
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
    topSection: {
    },
    bottomSection: {
        flex: 1
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    dropdown: {
        width: '50%',
        padding: 30
    },
    noRecordsText: {
        textAlign: 'center',
        fontSize: 16
    }
});