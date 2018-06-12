import React, { Component } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Button,
    Text,
    Card
} from 'react-native';

import ExpenseItem from '../Expenses/ExpenseItem';

export default class ExpenseList extends Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={this.props.expenses}
                    renderItem={(item) => (
                        <ExpenseItem
                            itemIndex={item.index}
                            item={item.item}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});