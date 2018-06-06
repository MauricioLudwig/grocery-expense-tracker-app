import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Modal
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';

export default class Overview extends React.Component {

    state = {
        showAddExpenseModal: false
    };

    launchAddExpenseScreen = () => {
        this.props.navigator.push({
            screen: 'groceryexpensetracker.AddExpenseScreen',
            title: 'Add New Expense',
            animated: true,
            animationType: 'slide-horizontal'
        });
    };

    render() {
        return (
            <View>
                <Text>Overview Screen</Text>
                <Button
                    title="Add Expense"
                    onPress={this.launchAddExpenseScreen} />
                <Modal
                    animationType="slide"
                    visible={this.state.showAddExpenseModal}
                    onRequestClose={() => this.setState({ showAddExpenseModal: false })}
                    transparent={false}>
                </Modal>
            </View>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});