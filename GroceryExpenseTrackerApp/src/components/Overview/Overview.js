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
import { toolbarColor } from '../../styling/styling';
import { getMonths, getYears } from '../../constants';

export default class Overview extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    state = {
        expenses: [],
    };

    componentWillMount() {
        this.getData();
        this.setState({

        });
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
                    <Card>
                        <Text>Budget: 2000</Text>
                    </Card>
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
    },
});