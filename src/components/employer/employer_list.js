import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { SearchBar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import EmployerItem from './employer_item';

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

    render() {
        const isShowSearchBox = this.state.isShowSearchBox;
        const { search } = this.state;
        let lineHeight = isShowSearchBox ? 100 : 50;
        return (
            <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: SCREEN_WIDTH, height: lineHeight, paddingTop: 35 }}>
                <TouchableOpacity style={{ position: 'absolute', left: 10, top: 12 }} onPress={() => { }}>
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

const lstItems = [{
    Id: 1,
    customer_Name: "Blue",
    dateCreated: "2020-01-15",
    userName: "ABC",
    nfyp: 15000000
}, {
    Id: 2,
    customer_Name: "Red",
    dateCreated: "2020-01-10",
    userName: "XYZ",
    nfyp: 19000000
}];

export default class EmployerScreen extends React.Component {
    state = {
        searchKeyword: ''
    }

    onChangeSearch = (searchKeyword) => {
        this.setState({ searchKeyword: searchKeyword });
    }

    render() {
        return (
            <View style={styles.container}>
                <EmployerTitle onChangeKW={this.onChangeSearch} />

                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <EmployerItem lstItems={lstItems} />
                </View>
            </View>
        );
    }
}