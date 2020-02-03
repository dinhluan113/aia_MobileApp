import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
// Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
// Redux
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
// Components
import HomeScreen from '../home/home.js';

import EmployerScreenList from '../employer/employer_list.js';
import EmployerItemAdd from '../employer/employer_add.js';
import EmployerItemEdit from '../employer/employer_edit.js';

import ContractScreenList from '../contracts/contract_list.js';
import ContractItemAdd from '../contracts/contract_add.js';
import ContractItemEdit from '../contracts/contract_edit.js';

import SettingsScreen from '../setting/setting.js';

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
        iconName = focused ? `md-home` : `ios-home`;
    } else if (routeName === 'Contract') {
        iconName = focused ? `ios-paper` : `md-paper`;
    } else if (routeName === 'Employer') {
        iconName = focused ? `md-people` : `ios-people`;
    } else if (routeName === 'Settings') {
        iconName = `ios-settings`;
    }
    return <IconComponent name={iconName} size={25} color={tintColor} />;
};
const IOS_MODAL_ROUTES = ['OptionsScreen'];

// CONTRACT //
const ContractStack = createStackNavigator(
    {
        ContractScreenList: { screen: ContractScreenList, navigationOptions: { headerShown: false }, params: { isRefresh: false } },
        ContractItemAdd: {
            screen: ContractItemAdd,
            navigationOptions: ({ navigation }) => ({
                title: 'Thêm hợp đồng mới',
            }),
        },
        ContractItemEdit: {
            screen: ContractItemEdit,
            navigationOptions: ({ navigation }) => ({
                title: 'Chỉnh sửa hợp đồng',
            }),
        },
    },
    {
        initialRouteName: 'ContractScreenList',
    }
);

ContractStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName != 'ContractScreenList')
        tabBarVisible = false;
    return {
        tabBarVisible,
    }
}
// END CONTRACT //

// EMPLOYER //
const EmployerStack = createStackNavigator(
    {
        EmployerScreenList: { screen: EmployerScreenList, navigationOptions: { headerShown: false } },
        EmployerItemAdd: {
            screen: EmployerItemAdd,
            navigationOptions: ({ navigation }) => ({
                title: 'Thêm nhân viên mới',
            }),
        },
        EmployerItemEdit: {
            screen: EmployerItemEdit,
            navigationOptions: ({ navigation }) => ({
                title: 'Chỉnh sửa nhân viên',
            }),
        },
    },
    {
        initialRouteName: 'EmployerScreenList',
    }
);

EmployerStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName != 'EmployerScreenList')
        tabBarVisible = false;
    return {
        tabBarVisible,
    }
}


// HOME //
const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen, navigationOptions: { headerShown: false } },
        ContractItemEdit: {
            screen: ContractItemEdit,
            navigationOptions: ({ navigation }) => ({
                title: 'Chỉnh sửa hợp đồng',
            }),
        },
    },
);

HomeStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    let routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName != 'Home')
        tabBarVisible = false;
    return {
        tabBarVisible,
    }
}
// END HOME //

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                title: 'Trang chủ',
            },
        },
        Contract: {
            screen: ContractStack,
            navigationOptions: {
                title: 'Hợp đồng',
            },
        },
        Employer: {
            screen: EmployerStack,
            navigationOptions: {
                title: 'Nhân viên',
            },
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                title: 'Tài khoản',
            },
        },
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