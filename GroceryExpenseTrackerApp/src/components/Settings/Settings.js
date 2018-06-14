import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

import { getLibraries } from '../../constants';
import { appColors } from '../../styling';
import { clearDb } from '../../database/realm';

export default class Settings extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: appColors.toolbarColor,
        navBarBackgroundColor: appColors.toolbarBackgroundColor,
        statusBarColor: appColors.statusBarColor
    };

    constructor(props) {
        super(props);
        this.reloadBudget();
    }

    state = {
        budget: '',
        value: ''
    };

    reloadBudget = () => {
        this.getBudgetFromLocalStore()
            .then(res => {
                this.setState({
                    budget: res
                });
            });
    };

    saveBudget = () => {

        this.saveBudgetToLocalStore();
        this.displayToast(`New budget set at ${this.state.value}.`);
        this.setState({
            value: ''
        }, this.reloadBudget());;
    };

    async getBudgetFromLocalStore() {
        try {
            const value = await AsyncStorage.getItem('@BudgetKey:key');
            return value;
        } catch (error) {
            alert('Error retrieving value');
        };
    }

    async saveBudgetToLocalStore() {
        try {
            await AsyncStorage.setItem('@BudgetKey:key', this.state.value)
        } catch (error) {
            alert('Unable to save');
        }
    }

    onDeleteDataHandler = () => {
        Alert.alert(
            'Reset App?',
            'All data will be lost. This action is irreversible.',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => this.DeleteAppData(),
                }
            ],
            { cancelable: true }
        );
    }

    DeleteAppData = () => {
        clearDb()
            .then(() => {
                AsyncStorage.removeItem('@BudgetKey:key');
                this.reloadBudget();
            })
            .catch(error => {
                alert('Could not perform operation.');
            });

        this.displayToast('App data was deleted.');
    };

    onChangeText = (text) => {
        this.setState({
            value: text.replace(/[^0-9]/g, '')
        });
    };

    displayToast = (msg) => {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    render() {

        const fieldIsEmpty = this.state.value.length < 1;
        const libraries = getLibraries().map((library, index) => {
            return (
                <View key={index}>
                    <Text selectable={true}>{library.title}</Text>
                    <Text selectable={true}>{library.url}</Text>
                    <Divider style={styles.divider} />
                </View>
            );
        });

        return (
            <ScrollView style={styles.container}>
                <Card title="Budget">
                    <Text>Keep track of your expenses by setting a monthly budget. Only integers are permitted (0-9).</Text>
                    <Divider style={styles.divider} />
                    <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{this.state.budget ? `Current budget: ${this.state.budget}` : 'No budget has been set.'}</Text>
                    <TextInput
                        placeholder="Enter a new budget here"
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.onChangeText(text)}
                        value={this.state.value}
                    />
                    <Button
                        color={appColors.btnPrimary}
                        onPress={() => this.saveBudget()}
                        title="Save"
                        disabled={fieldIsEmpty}
                    />
                </Card>
                <Card title="Credits">
                    <Text style={{ fontWeight: 'bold' }}>Developed by</Text>
                    <Text selectable={true}>Mauricio Ludwig</Text>
                    <Text selectable={true}>mauricio.ludwig@outlook.com</Text>
                    <Text selectable={true}>https://github.com/MauricioLudwig</Text>
                    <Divider style={styles.divider} />
                    <Text>This app was built with React Native (0.55.4) and Realm (2.8.1) for persisting data to local storage.</Text>
                </Card>
                <Card title="Third-Party Libraries">
                    {libraries}
                </Card>
                <Card title="Reset Database">
                    <Text>Clear all data stored on this device. This will remove any existing expenses and reset the app to default settings.</Text>
                    <Divider style={styles.divider} />
                    <Button
                        color={appColors.btnDanger}
                        onPress={() => this.onDeleteDataHandler()}
                        title="Delete Data"
                    />
                </Card>
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.backgroundColor
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#efefef'
    }
});