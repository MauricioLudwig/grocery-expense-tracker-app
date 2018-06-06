import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button
} from 'react-native';
import DatePicker from 'react-native-datepicker';

const whitelist = '0123456789';

export default class AddExpense extends React.Component {

    state = {
        expenseInput: '',
        date: '2016-05-15'
    };

    componentWillMount() {

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        let formatToday = `${year}-${month}-${day}`

        this.setState({
            date: formatToday
        });
    };

    onChangeText = (text) => {

        let whitelistText = '';

        for (let i = 0; i < text.length; i++) {
            if (whitelist.includes(text[i])) {
                whitelistText += text[i];
            };
        };

        this.setState({
            expenseInput: whitelistText
        })

    };

    onAddExpense = () => {
    };

    render() {

        let enableAddBtn = this.state.expenseInput.length > 0;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Date</Text>
                <Text style={styles.subtitle}>Day of purchase</Text>
                <DatePicker
                    style={styles.datePicker}
                    mode="date"
                    placeholder="Select date"
                    format="YYYY-MM-DD"
                    date={this.state.date}
                    onDateChange={(date) => { this.setState({ date }) }}
                />
                <Text style={styles.header}>Expense</Text>
                <Text style={styles.subtitle}>Only numbers (0 - 9) allowed</Text>
                <TextInput
                    numberOfLines={1}
                    maxLength={10}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.expenseInput}
                />
                <View style={styles.fillSpace}></View>
                <Button title="Add" onPress={this.onAddExpense} disabled={!enableAddBtn} />
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
    subtitle: {
        fontSize: 10,
        marginBottom: 5
    },
    numberInput: {

    },
    datePicker: {
        width: '100%',
        marginBottom: 20
    },
    fillSpace: {
        flex: 1
    }
});