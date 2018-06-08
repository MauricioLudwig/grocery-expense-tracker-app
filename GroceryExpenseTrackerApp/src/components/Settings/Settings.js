import React from 'react';
import { View, Text } from 'react-native';

export default class Settings extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    render() {
        return (
            <View>
                <Text>Settings Screen</Text>
            </View>
        );
    };

}