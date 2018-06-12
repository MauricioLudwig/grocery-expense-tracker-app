import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import Scatter from './Scatter';
import Pie from './Pie';
import { appColors } from '../../styling';
import { getMonths } from '../../constants';
import Realm, { getExpensesForYear, getExpensesForMonth } from '../../database/realm';

export default class Charts extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: appColors.toolbarColor,
        navBarBackgroundColor: appColors.toolbarBackgroundColor
    };

    state = {
        currentYear: (new Date()).getFullYear(),
        currentMonth: ((new Date()).getMonth() + 1),
        scatterData: [],
        pieData: []
    };

    constructor(props) {
        super(props);

        this.reloadData();
        Realm.addListener('change', () => {
            this.reloadData();
        });
    }

    reloadData = () => {

        getExpensesForMonth().then((res) => {
            this.setState({ scatterData: res })
        }).catch(error => {
            this.setState({ scatterData: [] })
        });

        getExpensesForYear().then((res) => {
            this.setState({ pieData: res })
        }).catch((error) => {
            this.setState({ pieData: [] })
        });
    };

    render() {

        const months = getMonths();

        const monthCardLabel = `${months[this.state.currentMonth - 1].label}`;
        const yearCardLabel = `${this.state.currentYear}`

        const textOutput = (
            <Card>
                <View style={styles.textOutput}>
                    <Icon style={styles.icon} name="alert-circle" size={25} />
                    <Text style={styles.emptyListText}>No data available to display.</Text>
                </View>
            </Card>
        );

        return (
            <ScrollView style={styles.container}>
                <Card title={monthCardLabel}>
                    <Text>Have a look at your daily expenses for the current month.</Text>
                    <Text>Day ( x )</Text>
                    <Text>Sum of expenses ( y )</Text>
                </Card>
                {
                    this.state.pieData.length > 0
                        ? <Scatter data={this.state.scatterData} />
                        : textOutput
                }
                <Card title={yearCardLabel}>
                    <Text>Have a look at your daily expenses for the current year. Scrollable horizontally.</Text>
                </Card>
                {
                    this.state.pieData.length > 0
                        ? <Pie data={this.state.pieData} />
                        : textOutput
                }
            </ScrollView>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.backgroundColor
    },
    emptyListText: {
        textAlign: 'center',
        fontSize: 16
    },
    textOutput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        paddingRight: 10
    }
});