import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Card } from 'react-native-elements';

import { btnColor, toolbarColor } from '../../styling';
import { addExpense } from '../../database/realm';

export default class AddExpense extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor,
        navBarButtonColor: toolbarColor.color
    };

    state = {
        date: '',
        expense: ''
    };

    componentWillMount() {

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let shortDate = `${year}-${month}-${day}`;

        this.setState({
            date: shortDate
        });

    };

    onAddExpense = () => {

        let date = this.state.date.split('-');
        let newExpense = {
            id: Math.floor(Date.now() / 1000),
            expense: Number(this.state.expense),
            year: Number(date[0]),
            month: Number(date[1]),
            day: Number(date[2])
        };

        addExpense(newExpense)
            .then()
            .catch((error) => {
                alert(`Not able to add new expense. Error: ${error}`);
            });
        this.props.navigator.pop();

    };

    onChangeText = (text) => {
        this.setState({
            expense: text.replace(/[^0-9]/g, '')
        });
    };

    render() {

        const fieldIsEmpty = this.state.expense.length < 1;
        const calendarIcon = <Icon name="calendar" color='red' size={30}></Icon>;

        return (
            <View style={styles.container}>
                <Card title="Day of Purchase">
                    <Text style={material.caption}>Click field to change. Format is YYYY-MM-DD.</Text>
                    <DatePicker
                        style={styles.datepicker}
                        iconComponent={calendarIcon}
                        mode="date"
                        placeholder="Select date"
                        format="YYYY-M-D"
                        date={this.state.date}
                        onDateChange={(date) => { this.setState({ date }) }}
                    />
                </Card>
                <Card title="Expense">
                    <Text style={material.caption}>Only integers are supported (0-9).</Text>
                    <TextInput
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.onChangeText(text)}
                        value={this.state.expense}
                    />
                </Card>
                <View style={styles.fillSpace}></View>
                <View style={styles.addBtnView}>
                    <Button
                        color={btnColor}
                        title="Add"
                        onPress={this.onAddExpense}
                        disabled={fieldIsEmpty}
                    />
                </View>
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    datepicker: {
        width: '100%',
        marginTop: 10
    },
    fillSpace: {
        flex: 1
    },
    addBtnView: {
        padding: 20
    }
});