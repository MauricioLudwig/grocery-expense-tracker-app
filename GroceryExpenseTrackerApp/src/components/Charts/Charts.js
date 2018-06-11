import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Picker,
    AsyncStorage
} from 'react-native';
import { Card } from 'react-native-elements';

import Line from './Line';
import Pie from './Pie';
import { getYears, getMonths } from '../../constants';
import { btnColor, toolbarColor } from '../../styling';

export default class Charts extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    onNavigatorEvent(event) {
        if (event.id === 'bottomTabSelected') {
        }
    }

    constructor(props) {
        super(props);
        state = {
            dailyExpenses: [],
            monthlyExpenses: [],
            selectedYear: 0,
            selectedMonth: 0
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {

        let today = new Date();

        this.setState({
            selectedYear: today.getFullYear(),
            selectedMonth: (today.getMonth() + 1)
        });
    }

    async getListData() {
        try {
            let data = await AsyncStorage.getItem('@LocalStorage:key');
            if (!data) {
                data = [];
            } else {
                data = JSON.parse(data);
            }
            return data;
        } catch (error) {
            alert('Operation failed: unable to retrieve data.');
        };
    };

    onYearChange = (value) => {
        this.updateChartData(value, this.state.selectedMonth)
    }

    onMonthChange = (value) => {
        this.updateChartData(this.state.selectedYear, value);
    }

    updateChartData = (year) => {

        this.getListData()
            .then(((res) => {
                this.updatePieChart(res, year);
            }))

    }

    updatePieChart = (res, year) => {

        let monthlyExpenses = [];

        for (let i = 1; i < 13; i++) {
            let sum = 0;
            let monthExpenses = res
                .filter(o => o.year == year && o.month == i)
                .map(o => o.expense);

            for (let y = 0; y < monthExpenses.length; y++) {
                sum += monthExpenses[y];
            }

            monthlyExpenses.push({
                month: i,
                sum: sum
            });
        }

        this.setState({
            monthlyExpenses: monthlyExpenses,
            selectedYear: year,
        });

    }

    render() {

        const yearItems = getYears().map((year, index) => (
            <Picker.Item
                key={index}
                label={year.toString()}
                value={year}
            />
        ));

        const monthItems = getMonths().map((month, index) => (
            <Picker.Item
                key={index}
                label={month.label}
                value={month.value}
            />
        ));

        return (
            <ScrollView style={styles.container}>
                <Card title="Filter">
                    <View style={styles.pickers}>
                        <Picker
                            selectedValue={this.state.selectedYear}
                            onValueChange={(value) => this.updateChartData(value)}
                            prompt="Year"
                            style={styles.picker}
                        >
                            {yearItems}
                        </Picker>
                        <Picker
                            selectedValue={this.state.selectedMonth}
                            onValueChange={(value) => this.onMonthChange(value)}
                            prompt="Month"
                            style={styles.picker}
                        >
                            {monthItems}
                        </Picker>
                    </View>
                </Card>
                <Card title="Month Overview">
                    <Line data={[1, 2, 3, 1]} />
                </Card>
                <Card title="Year Overview">
                    {this.state.monthlyExpenses == undefined
                        ? <Text>No data available</Text>
                        : <Pie data={this.state.monthlyExpenses} />
                    }
                </Card>
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pickers: {
        flex: 1,
        flexDirection: 'row'
    },
    picker: {
        width: '50%'
    }
});