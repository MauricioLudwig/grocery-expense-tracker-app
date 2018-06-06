import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class ExpenseItem extends React.Component {

    render(){
        return (
            <TouchableOpacity style={styles.container}>
                <Text>{this.props.item.date}</Text>
                <Text>{this.props.item.expense}</Text>
            </TouchableOpacity>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#eee',
        marginTop: 5
    }
});