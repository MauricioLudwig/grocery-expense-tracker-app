import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Button,
    Text
} from 'react-native';

import ExpenseItem from '../Expenses/ExpenseItem';
import { btnColor } from '../../styling/styling';

export default class ExpenseList extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={this.props.expenses}
                    renderItem={(item) => (
                        <ExpenseItem
                            key={item.index}
                            item={item.item}
                        />
                    )}
                />
                <Button
                    color={btnColor}
                    title="Add Expense"
                    onPress={() => this.props.launchAddExpenseScreen()}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatList: {
        marginBottom: 10
    }
});