import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Button,
    StyleSheet
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { material } from 'react-native-typography';

import { getLibraries } from '../../constants';
import { btnColor } from '../../styling/styling';

export default class Settings extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true
    };

    state = {
        value: '1500'
    };

    onUpdateBudget = () => {

    };

    render() {

        const libraries = getLibraries().map((library, index) => {
            return (
                <View key={index}>
                    <Text>{library.title}</Text>
                    <Text>{library.url}</Text>
                    <Divider style={styles.divider} />
                </View>
            );
        });

        return (
            <ScrollView style={styles.container}>
                <Card title="Budget">
                    <Text style={material.caption}>Keep track of your expenses by setting a monthly budget.</Text>
                    <TextInput
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(value) => this.setState({ value })}
                        value={this.state.value}
                    />
                    <Button
                        color={btnColor}
                        onPress={() => this.onUpdateBudget()}
                        title="Save"
                    />
                </Card>
                <Card title="Credits">
                    <Text>Programming & Design</Text>
                    <Divider style={styles.divider} />
                    <Text>Mauricio Ludwig</Text>
                    <Text>Mauricio.ludwig@outlook.com</Text>
                </Card>
                <Card title="Third-Party Libraries">
                    {libraries}
                </Card>
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#ffc9ca'
    }
});