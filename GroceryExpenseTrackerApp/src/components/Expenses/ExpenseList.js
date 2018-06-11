import React from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    Button,
    Text
} from 'react-native';

import ExpenseItem from '../Expenses/ExpenseItem';

export default class ExpenseList extends React.Component {

    renderSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={this.props.expenses}
                    renderItem={(item) => (
                        <ExpenseItem
                            item={item.item}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
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
        marginBottom: 5
    },
    separator: {
        height: 1,
        backgroundColor: '#ede3e3'
    }
});