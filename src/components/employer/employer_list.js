import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { SearchBar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import EmployerItem from './employer_item';
import EmployerItemAdd from './employer_add';
import StyleGlobal from '../../../assets/stylesGlobal.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUS_BAR_HEIGHT,
    },
});


class EmployerTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        search: '',
        isShowSearchBox: false
    }

    toogleSearch = () => {
        this.setState({
            isShowSearchBox: !this.state.isShowSearchBox
        });
    }

    updateSearch = search => {
        this.setState({ search });
    };

    focusTextInput = () => {
        this.props.onChangeKW(this.state.search);
    };

    onGoToAddPage = () => {
        this.props.onGoToAddPage();
    };

    render() {
        const isShowSearchBox = this.state.isShowSearchBox;
        const { search } = this.state;
        let lineHeight = isShowSearchBox ? 100 : 50;
        return (
            <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: SCREEN_WIDTH, height: lineHeight, paddingTop: 35 }}>
                <TouchableOpacity style={{ position: 'absolute', left: 10, top: 12 }} onPress={() => this.onGoToAddPage()}>
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', right: 10, top: 12, width: 35, height: 35 }} onPress={this.toogleSearch}>
                    <Icon name="search" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ position: 'absolute', left: 50, right: 50, top: 12, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: '700' }}>Danh sách nhân viên</Text>
                {
                    isShowSearchBox ?
                        <SearchBar
                            platform='ios'
                            placeholder="Tìm kiếm nhân viên..."
                            onChangeText={this.updateSearch}
                            containerStyle={{ backgroundColor: 'transparent' }}
                            inputContainerStyle={{ backgroundColor: '#fff' }}
                            value={search}
                            cancelButtonTitle='Hủy'
                            cancelButtonProps={{ buttonTextStyle: { color: '#fff' } }}
                            onBlur={this.focusTextInput}
                        />
                        : <Text></Text>
                }
            </LinearGradient>
        );
    }
}


class EmployerSearchBox extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
        this.props.onChangeKW(search);
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                platform='ios'
                placeholder="Tìm kiếm nhân viên..."
                onChangeText={this.updateSearch}
                containerStyle={{ backgroundColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: '#fff' }}
                value={search}
                cancelButtonTitle='Hủy'
                cancelButtonProps={{ buttonTextStyle: { color: '#fff' } }}
            />
        );
    }
}

const lstItems = [
    {
        Id: 1,
        customer_Name: "Robert Langdon",
        customer_Phone: "0987654123",
    }, {
        Id: 2,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 3,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 4,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 5,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 6,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 7,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 8,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    }, , {
        Id: 9,
        customer_Name: "Timothy Treadwell",
        customer_Phone: "0123456789",
    },
];

class EmployerScreenList extends React.Component {

    static navigationOptions = { headerShown: false }

    state = {
        searchKeyword: ''
    }

    onChangeSearch = (searchKeyword) => {
        this.setState({ searchKeyword: searchKeyword });
    }

    onGoToAddPage = () => {
        this.props.navigation.navigate('Details')
    }

    render() {
        return (
            <View style={styles.container}>
                <EmployerTitle onChangeKW={this.onChangeSearch} onGoToAddPage={this.onGoToAddPage} />

                <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                    <EmployerItem lstItems={lstItems} />
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.onGoToAddPage()}
                    style={{
                        position: 'absolute',
                        right: 15,
                        bottom: 20,
                    }} >

                    <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25 }, StyleGlobal.boxShadowHeavy]}>
                        <Ionicons name={'ios-add'} size={25} color='#fff' />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

const RootStack = createStackNavigator(
    {
        Home: EmployerScreenList,
        Details: EmployerItemAdd,
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class EmployerScreen extends React.Component {
    render() {
        return <AppContainer />;
    }
}