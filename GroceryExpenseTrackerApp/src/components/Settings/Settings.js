import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { material } from 'react-native-typography';

import { getLibraries } from '../../constants';
import { btnColor, toolbarColor } from '../../styling';
import { getBudget } from '../../database/realm';

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
    };

    onChangeText = (text) => {
        this.setState({
            value: text.replace(/[^0-9]/g, '')
        });
    };

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
                    <Text style={material.caption}>Keep track of your expenses by setting a monthly budget. Current budget is {this.state.budget}.</Text>
                    <TextInput
                        placeholder="Enter a new budget here"
                        numberOfLines={1}
                        maxLength={20}
                        keyboardType={'numeric'}
                        onChangeText={(text) => this.onChangeText(text)}
                        value={this.state.value}
                    />
                    <Button
                        color={btnColor}
                        onPress={() => this.reloadBudget()}
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
                    <Text>This app was built with React Native (0.55) and Realm (2.8) for persisting data to local storage.</Text>
                </Card>
                <Card title="Third-Party Libraries">
                    {libraries}
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