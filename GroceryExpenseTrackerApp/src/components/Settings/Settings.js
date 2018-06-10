import React from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Button,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { material } from 'react-native-typography';

import { getLibraries } from '../../constants';
import { btnColor, toolbarColor } from '../../styling/styling';

export default class Settings extends React.Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
    };

    state = {
        value: ''
    };

    componentWillMount() {
        this.getBudget()
            .then(res => {
                this.setState({
                    value: res
                });
            });
    }

    onUpdateBudget = () => {

        let invalidNumber = isNaN(this.state.value);

        if (!invalidNumber) {
            this.saveBudget()
                .then(() => {
                    alert(`Budget (${this.state.value}) set!`);
                });
        } else {
            alert(`${this.state.value} is not a valid number, try again...`);
        }
    };

    async getBudget() {
        try {
            let budget = await AsyncStorage.getItem('@MonthlyBudget:key');
            if (!budget) {
                budget = '0'
            }
            return budget;
        } catch (error) {
            alert('Could not fetch data from local storage');
        };
    }

    async saveBudget() {
        try {
            await AsyncStorage.setItem('@MonthlyBudget:key', this.state.value);
        } catch (error) {
            alert('Unable to save data to local storage');
        };
    }

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
                    <Text>Mauricio Ludwig</Text>
                    <Text>mauricio.ludwig@outlook.com</Text>
                    <Text>https://github.com/MauricioLudwig</Text>
                    <Divider style={styles.divider} />
                    <Text>This app was built with React Native (0.55)</Text>
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
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#ffc9ca'
    }
});