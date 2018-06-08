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

import ExpenseList from '../Expenses/ExpenseList';

export default class Overview extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    state = {
        expenses: []
    };

    componentWillMount() {
        this.getData();
    };

    async getData() {
        try {
            let data = await AsyncStorage.getItem('@LocalStorage:key');
            if (!data) {
                data = [];
            } else {
                data = JSON.parse(data);
            }
            this.setState({
                expenses: data
            });
        } catch (error) {
            alert('Could not fetch data from local storage');
        };
    };

    async setData() {
        try {
            await AsyncStorage.setItem('@LocalStorage:key', JSON.stringify(this.state.expenses));
        } catch (error) {
            alert('Unable to save data to local storage');
        };
    }

    addExpenseHandler = (newExpense) => {
        this.setState(prevState => ({
            expenses: prevState.expenses.concat(newExpense)
        }), this.setData);
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
                    <Text>Overview Screen, FlatList Length: {this.state.expenses.length}</Text>
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
        flex: 1
    },
    topSection: {
        flex: 1
    },
    bottomSection: {
        flex: 4
    }
});