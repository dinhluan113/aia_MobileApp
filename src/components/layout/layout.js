import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
// Navigation
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
// Redux
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
// Components
import HomeScreen from '../home/home.js';
import EmployerScreen from '../employer/employer_list.js';
import SettingsScreen from '../setting/setting.js';

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = `ios-home`;
    } else if (routeName === 'Settings') {
        iconName = `ios-settings`;
    }
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Employer: EmployerScreen,
        Settings: SettingsScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) =>
                getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(TabNavigator);