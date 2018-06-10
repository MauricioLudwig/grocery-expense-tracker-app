import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

export default class ExpenseItem extends React.Component {

    render() {

        const shortDate = `${this.props.item.year}-${this.props.item.month}-${this.props.item.day}`;

        return (
            <Card style={{ backgroundColor: 'blue' }}>
                <View style={styles.container}>
                    <Text>{shortDate}</Text>
                    <Text>{this.props.item.expense}</Text>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Icon name="trash-2" />
                    </TouchableOpacity>
                </View>
            </Card>
        );
    };

};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#fff',
    }
});