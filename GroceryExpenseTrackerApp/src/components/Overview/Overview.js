import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    AsyncStorage
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
        return (
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <Card>
                        <Text>Budget: (todo)</Text>
                        <Text>Sum of expenses this month: (todo)</Text>
                        <Text>Budget conclusion (todo)</Text>
                    </Card>
                </View>
                <View style={styles.bottomSection}>
                    {this.state.expenses.length > 0
                        ? <ExpenseList expenses={this.state.expenses} />
                        : <Text style={styles.emptyListText}>No records exist for this period...</Text>}
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
        flex: 2
    },
    bottomSection: {
        flex: 4
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16
    }
});