import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider, connect } from 'react-redux';
import store from './src/redux/store/index.js';

import LoginScreen from './src/components/account/login.js';
import LayoutScreen from './src/components/layout/layout.js';


// <Text>Status: {this.props.loginStatus ? "True" : "False"}</Text>
class RootApp extends React.Component {
    render() {
        if (!this.props.loginStatus) {
            return (
                <View>
                    <LoginScreen />
                </View>
            );
        }
        else {
            return (
                <LayoutScreen />
            );
        }
    }
}

const mapStateToProps = state => ({
    loginStatus: state.loginStatus
});

const ConnectedRoot = connect(mapStateToProps, null)(RootApp);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRoot />
            </Provider>
        );
    }
}

//export default connect(mapStateToProps, null)(App);