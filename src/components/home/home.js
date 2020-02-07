import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Provider, connect } from 'react-redux';
import store from '../../redux/store/index.js';
import * as actions from '../../redux/actions';

import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import HomeNavbar from './home_Navbar';
import HomeContent from './home_Content';
import { LinearGradient } from 'expo-linear-gradient';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const CommitRepository = RepositoryFactory.get('commit')

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const _crrDate = new Date();
let JWT_TOKEN = '';
let _IS_MOUNTED = false;
let NAVBARHEIGHT = STATUS_BAR_HEIGHT + 50;
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        JWT_TOKEN = this.props.getJWTToken;
    }
    componentDidMount = async () => {
        this._IS_MOUNTED = true;
        let date = {
            'Month': _crrDate.getMonth() + 1,
            'Year': _crrDate.getFullYear()
        };
        this.props.doSetcrrDate(date);
        this.setState({ crrMonth: date.Month, crrYear: date.Year }, () => {
            this.props.navigation.addListener('willFocus', async () => {
                if (this._IS_MOUNTED) {
                    await this.getCurrentCommit(this.state.crrMonth, this.state.crrYear);
                }
            })
        })
        //await this.getCurrentCommit(date.Month, date.Year);
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
    }
    state = {
        crrCommit: 0,
        crrFYP: 0,
        crrNeedToDo: 0,
        crrMonth: 0,
        crrYear: 0,
    }

    onChangeDate = (month, year) => {
        this.getCurrentCommit(month, year);
    }

    getCurrentCommit = async (month, year) => {
        if (this._IS_MOUNTED) {
            let _this = this;
            let promise = CommitRepository.GetCommitByMonth(month, year, JWT_TOKEN);
            promise
                .then(function (response) {
                    let commitValue = 0;
                    let crrFYPValue = 0;
                    let crrNeedToDoValue = 0;
                    if (typeof response.data.crrCommit != 'undefined') {
                        commitValue = response.data.crrCommit;
                        crrFYPValue = response.data.fyp;
                        crrNeedToDoValue = response.data.remain;
                    }

                    _this.setState({
                        crrCommit: commitValue,
                        crrFYP: crrFYPValue,
                        crrNeedToDo: crrNeedToDoValue,
                        crrMonth: month,
                        crrYear: year,
                    });
                })
                .catch(function (e) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                    _this.props.doLogout();
                })
                .finally(function () {

                });
        }
    }

    renderNavBar = () => (
        <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: SCREEN_WIDTH, height: NAVBARHEIGHT, paddingTop: STATUS_BAR_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>Quản lý hợp đồng thông minh</Text>
        </LinearGradient>
    )

    viewContractDetail = (id) => {
        this.props.navigation.navigate('ContractItemEdit', { itemId: id })
    }

    renderContent = () => {
        let { crrMonth, crrYear } = this.state;
        return (
            <HomeContent crrFYP={this.state.crrFYP} JWT_TOKEN={JWT_TOKEN} crrNeedToDo={this.state.crrNeedToDo} viewContractDetail={this.viewContractDetail} />
        )
    }

    onChangeCommit = (value) => {
        let _this = this;
        let { crrMonth, crrYear } = this.state;
        let promise = CommitRepository.ChangeCommitByMonth(value, crrMonth, crrYear, JWT_TOKEN);
        promise
            .then(function () {
                _this.getCurrentCommit(crrMonth, crrYear);
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                console.log(e);
                //_this.props.doLogout();
            })
            .finally(function () {
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ReactNativeParallaxHeader
                    headerMinHeight={50}
                    headerMaxHeight={125}
                    extraScrollHeight={0}
                    title={<HomeNavbar crrCommit={this.state.crrCommit} onChangeCommit={this.onChangeCommit} onChangeDate={this.onChangeDate} email={this.props.getCurrentEmail} />}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    alwaysShowTitle={false}
                    alwaysShowNavBar={false}
                    scrollViewProps={{
                        onScrollBeginDrag: () => { },
                        onScrollEndDrag: () => { },
                    }}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f9ff',
        flex: 1,
    },
});

const mapStateToProps = state => ({
    getJWTToken: state.getJWTToken,
    getCurrentEmail: state.getCurrentEmail
});

export default connect(mapStateToProps, actions)(HomeScreen);

//export default class HomeScreen extends React.Component {
//    render() {
//        return (
//            <Provider store={store}>
//                <ConnectedRoot />
//            </Provider>
//        );
//    }
//}