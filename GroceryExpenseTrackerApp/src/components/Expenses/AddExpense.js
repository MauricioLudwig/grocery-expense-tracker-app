import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import { btnColor } from '../../styling/styling';
import Icon from 'react-native-vector-icons/EvilIcons';

export default class AddExpense extends React.Component {

    state = {
        expense: '',
        date: ''
    };

    componentWillMount() {

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let formatToday = `${year}-${month}-${day}`;

        this.setState({
            date: formatToday
        });
    };

    onChangeText = (text) => {
        this.setState({
            expense: text
        })
    };

    onAddExpense = () => {
        let newExpense = {
            date: this.state.date,
            expense: this.state.expense
        };
        this.props.addExpenseHandler(newExpense);
    };

    render() {

        let emptyInputField = this.state.expense.length < 1;
        const customIconComponent = <Icon name="calendar" size={25}></Icon>

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Date</Text>
                <Text style={styles.small}>Day of purchase, click field to change</Text>
                <DatePicker
                    style={styles.datepicker}
                    iconComponent={customIconComponent}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    date={this.state.date}
                    onDateChange={(date) => { this.setState({ date }) }}
                />
                <Text style={styles.header}>Expense</Text>
                <Text style={styles.small}>Only numbers (0 - 9) allowed</Text>
                <TextInput
                    autoFocus={true}
                    numberOfLines={1}
                    maxLength={20}
                    keyboardType={'numeric'}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.expense}
                />
                {emptyInputField && <Text style={styles.requiredField}>Required</Text>}
                <View style={styles.fillSpace}></View>
                <Button
                    color={btnColor}
                    title="Add"
                    onPress={this.onAddExpense}
                    disabled={emptyInputField}
                />
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    header: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 10,
    },
    datepicker: {
        width: '100%',
        marginTop: 5,
        marginBottom: 20
    },
    numberInput: {

    },
    requiredField: {
        fontSize: 10,
        color: 'red',
        marginLeft: 5
    },
    fillSpace: {
        flex: 1
    }
});