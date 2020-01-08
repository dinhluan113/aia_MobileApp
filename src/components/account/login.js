import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

class LoginScreen extends Component {
    handleLogin = () => {
        this.props.doLogin();
    }
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
            <View>
                <Text style={styles.text} >Login Status: {this.props.loginStatus ? "True" : "False"}</Text>

                <Button onPress={this.handleLogin} title="Log in" />
                <Button onPress={this.handleLogout} title="Log out" />
            </View>
        )
    }
}
const mapStateToProps = state => ({
    loginStatus: state.loginStatus
});

export default connect(mapStateToProps, actions)(LoginScreen);

const styles = StyleSheet.create({
    text: {
        fontSize: 100,
        color: '#000',
    }
});