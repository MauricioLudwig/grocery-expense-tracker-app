import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/EvilIcons';
import { FormLabel, Card } from 'react-native-elements';

import { btnColor, toolbarColor } from '../../styling/styling';

export default class AddExpense extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    state = {
        expense: '',
        date: ''
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
            year: date[0],
            month: date[1],
            day: date[2],
            expense: this.state.expense
        };
        this.props.addExpenseHandler(newExpense);
        this.props.navigator.pop();
    };

    render() {

        const emptyInputField = this.state.expense.length < 1;
        const calendarIcon = <Icon name="calendar" size={30}></Icon>;

        return (
            <View style={styles.container}>
                <Card title="Day of Purchase">
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
                    <TextInput
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(text) => { this.setState({ expense: text }) }}
                        value={this.state.expense}
                    />
                </Card>
                <View style={styles.fillSpace}></View>
                <View style={styles.addBtnView}>
                    <Button
                        color={btnColor}
                        title="Add"
                        onPress={this.onAddExpense}
                        disabled={emptyInputField}
                    />
                </View>
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    datepicker: {
        width: '100%',
    },
    fillSpace: {
        flex: 1
    },
    addBtnView: {
        padding: 20
    }
});