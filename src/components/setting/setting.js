import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
    handleLogout = () => {
        Alert.alert(
            'Hello',
            'Are you sure want to continue?',
            [
                {
                    text: 'Yes', onPress: () => this.props.doLogout()
                },
                {
                    text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'
                },
            ],
            { cancelable: false }
        );
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button onPress={this.handleLogout} title="Log out" />
            </View>
        );
    }
}

export default connect(null, actions)(SettingsScreen);