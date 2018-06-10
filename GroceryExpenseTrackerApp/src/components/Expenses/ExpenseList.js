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
                    keyExtractor={(item, index) => index.toString()}
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
    }
});