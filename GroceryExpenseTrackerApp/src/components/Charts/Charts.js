import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Picker
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

    state = {
        selectedYear: 0,
        selectedMonth: 0
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;

        this.setState({
            selectedYear: year,
            selectedMonth: month
        });
    }

    render() {

        // Picker with Year values
        const yearItems = getYears().map((year, index) => (
            <Picker.Item
                key={index}
                label={year.toString()}
                value={year}
            />
        ));

        // Picker with Month values
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
                            onValueChange={(value) => { }}
                            prompt="Year"
                            style={styles.picker}
                        >
                            {yearItems}
                        </Picker>
                        <Picker
                            selectedValue={this.state.selectedMonth}
                            onValueChange={(value) => { }}
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
                    <Pie data={[1, 2, 3, 1]} />
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