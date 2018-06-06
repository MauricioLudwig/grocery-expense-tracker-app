import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';

import ExpenseList from '../Expenses/ExpenseList';

export default class Overview extends React.Component {

    state = {
        expenses: []
    };

    componentWillMount() {
        this.setState({
            expenses: [
                {
                    date: '2015-05-15',
                    expense: 50,
                },
                {
                    date: '2017-07-15',
                    expense: 30,
                },
                {
                    date: '2018-05-15',
                    expense: 25,
                },
                {
                    date: '2018-05-15',
                    expense: 25,
                },
                {
                    date: '2018-05-15',
                    expense: 25,
                },
                {
                    date: '2018-05-15',
                    expense: 25,
                },
                {
                    date: '2018-05-15',
                    expense: 25,
                }
            ]
        });
    };

    addExpenseHandler = (newExpense) => {
        this.props.navigator.resetTo({
            screen: 'groceryexpensetracker.OverviewTabScreen',
            title: 'Overview'
        });

        this.setState(prevState => ({
            expenses: prevState.expenses.concat(newExpense)
        }));
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
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Text>Overview Screen, Length: {this.state.expenses.length}</Text>
                </View>
                <View style={styles.bottomSection}>
                    <ExpenseList expenses={this.state.expenses} launchAddExpenseScreen={this.launchAddExpenseScreen} />
                </View>
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    topSection: {
        flex: 1
    },
    bottomSection: {
        flex: 4
    }
});