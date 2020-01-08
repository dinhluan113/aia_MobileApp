import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/redux/store';

import LoginScreen from './src/components/account/login.js';


export default function App() {
    return (
        <Provider store={store}>
            <LoginScreen />
        </Provider>
    );
}
