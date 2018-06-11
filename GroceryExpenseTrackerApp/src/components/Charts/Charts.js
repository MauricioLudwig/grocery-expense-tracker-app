import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import Bar from './Bar';
import Pie from './Pie';
import { btnColor, toolbarColor } from '../../styling';
import { getMonths } from '../../constants';
import Realm, { getExpensesForYear, getExpensesForMonth } from '../../database/realm';

export default class Charts extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    state = {
        currentYear: (new Date()).getFullYear(),
        currentMonth: ((new Date()).getMonth() + 1),
        pieData: [],
        barData: []
    };

    constructor(props) {
        super(props);

        this.reloadData();
        Realm.addListener('change', () => {
            this.reloadData();
        });
    }

    reloadData = () => {
        getExpensesForYear().then((res) => {
            this.setState({ pieData: res })
        }).catch((error) => {
            this.setState({ pieData: [] })
        });

        getExpensesForMonth().then((res) => {
            this.setState({ barData: res })
        }).catch(error => {
            this.setState({ barData: [] })
        });
    };

    render() {

        const months = getMonths();
        const monthCardLabel = `${months[this.state.currentMonth - 1].label}`;
        const yearCardLabel = `${this.state.currentYear}`
        const pieChart = (
            <ScrollView
                horizontal={true}
            >
                <Pie data={this.state.pieData} />
            </ScrollView>
        );
        const textOutput = (
            <Card>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon style={{ paddingRight: 10 }} name="alert-circle" size={25} />
                    <Text style={styles.emptyListText}>No data available to display.</Text>
                </View>
            </Card>
        )

        const barChart = (
            <ScrollView
                horizontal={true}
            >
                <Bar data={this.state.barData} />
            </ScrollView>
        );

        return (
            <ScrollView style={styles.container}>
                <Card title={monthCardLabel}>
                    <Text>Have a look at your daily expenses for the current month.</Text>
                </Card>
                {
                    this.state.pieData.length > 0
                        ? barChart
                        : textOutput
                }
                <Divider style={styles.divider} />
                <Card title={yearCardLabel}>
                    <Text>Have a look at your daily expenses for the current year.</Text>
                </Card>
                {
                    this.state.pieData.length > 0
                        ? pieChart
                        : textOutput
                }
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    divider: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'lightgray'
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16
    }
});