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
import { material } from 'react-native-typography';

import { getLibraries } from '../../constants';
import { btnColor, toolbarColor } from '../../styling';
import { getBudget, clearDb } from '../../database/realm';

export default class Settings extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarTextColor: toolbarColor.color,
        navBarBackgroundColor: toolbarColor.backgroundColor
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
        // TODO
    };

    saveBudget = () => {
        this.displayToast(`New budget set at ${this.state.value}.`);
        this.setState({
            value: ''
        });
    };

    onDeleteDataHandler = () => {
        Alert.alert(
            'Reset App?',
            'This action is irreversible.',
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
            .then()
            .catch(error => {
                alert('Could not perform operation.');
            });

        this.displayToast('Application data was deleted.');
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
                    <Text>{library.title}</Text>
                    <Text>{library.url}</Text>
                    <Divider style={styles.divider} />
                </View>
            );
        });

        return (
            <ScrollView>
                <Card title="Budget">
                    <Text style={material.caption}>Keep track of your expenses by setting a monthly budget. Only integers are permitted (0-9).</Text>
                    <Divider style={styles.divider} />
                    <TextInput
                        placeholder="Enter a new budget here"
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.onChangeText(text)}
                        value={this.state.value}
                    />
                    <Button
                        color={btnColor('accent')}
                        onPress={() => this.saveBudget()}
                        title="Save"
                        disabled={fieldIsEmpty}
                    />
                </Card>
                <Card title="Credits">
                    <Text style={{ fontWeight: 'bold' }}>Developed by</Text>
                    <Text>Mauricio Ludwig</Text>
                    <Text>mauricio.ludwig@outlook.com</Text>
                    <Text>https://github.com/MauricioLudwig</Text>
                    <Divider style={styles.divider} />
                    <Text>This app was built with React Native (0.55.4) and Realm (2.8.1) for persisting data to local storage.</Text>
                </Card>
                <Card title="Third-Party Libraries">
                    {libraries}
                </Card>
                <Card title="Reset Database">
                    <Text style={material.caption}>Clear all data stored on this device. This will remove any existing expenses and reset the app to default settings.</Text>
                    <Divider style={styles.divider} />
                    <Button
                        color={btnColor('danger')}
                        onPress={() => this.onDeleteDataHandler()}
                        title="Delete Data"
                    />
                </Card>
            </ScrollView>
        );
    };

}

const styles = StyleSheet.create({
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#efefef'
    }
});