import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

import EmployerItem from './employer_items';
import StyleGlobal from '../../../assets/stylesGlobal.js';

import { connect } from 'react-redux';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const EmployerRepository = RepositoryFactory.get('employer');


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
let JWT_TOKEN = '';

class EmployerTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    onGoToAddPage = () => {
        this.props.onGoToAddPage();
    };

    render() {
        return (
            <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: SCREEN_WIDTH, height: 50, paddingTop: 35 }}>
                <TouchableOpacity style={{ position: 'absolute', left: 10, top: 12 }} onPress={() => this.onGoToAddPage()}>
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                <Text style={{ position: 'absolute', left: 50, right: 50, top: 12, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: '700' }}>Danh sách nhân viên</Text>                
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    getJWTToken: state.getJWTToken,
});

let _IS_MOUNTED = false;

class EmployerScreenList extends React.Component {

    constructor(props) {
        super(props);
        JWT_TOKEN = this.props.getJWTToken;
    }

    state = {
        lstItems: [],
        pageSize: 25,
        pageIndex: 0,
        remain: 0,
        isShowLoading: false,
        refreshing: false,
    }

    componentDidMount = () => {
        this._IS_MOUNTED = true;
        let { pageIndex, pageSize } = this.state;
        this.getEmployerPaging(pageSize, pageIndex, JWT_TOKEN);

        this.props.navigation.addListener('willFocus', () => {
            if (typeof this.props.navigation.state.params != "undefined") {
                let isRefresh = this.props.navigation.state.params.isRefresh;
                if (isRefresh && this._IS_MOUNTED) {
                    this.setState({ refreshing: true, pageIndex: 0 }, () => {
                        this.getEmployerPaging(pageSize, pageIndex, JWT_TOKEN);
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
    }

    getEmployerPaging = (pageSize, pageIndex, JWT_TOKEN) => {
        this.setState({ isShowLoading: true });
        let _this = this;
        let promise = EmployerRepository.GetAll(pageSize, pageIndex, JWT_TOKEN);
        promise
            .then(function (response) {
                if (_this._IS_MOUNTED == true) {
                    if (pageIndex > 0) {
                        let crrList = _this.state.lstItems;
                        crrList = crrList.concat(response.data.lstEmpl);
                        _this.setState({
                            lstItems: crrList,
                            remain: response.data.remain,
                        });
                    }
                    else {
                        _this.setState({
                            lstItems: response.data.lstEmpl,
                            remain: response.data.remain,
                        });
                    }
                }
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                _this.props.doLogout();
            })
            .finally(function () {
                _this.setState({ isShowLoading: false, refreshing: false });
            });
    }

    onRefresh = () => {
        this.setState({ refreshing: true, pageIndex: 0 }, () => {
            this.getEmployerPaging(this.state.pageSize, this.state.pageIndex, JWT_TOKEN);
        });
    }

    onGoToAddPage = () => {
        this.props.navigation.navigate('EmployerItemAdd', { JWT_TOKEN: JWT_TOKEN })
    }

    viewDetail = (id) => {
        this.props.navigation.navigate('EmployerItemEdit', { itemId: id, JWT_TOKEN: JWT_TOKEN })
    }

    renderLoading = (isShowLoading) => {
        if (isShowLoading) {
            return (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#222', opacity: 0.2 }}></View>
                    <ActivityIndicator style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} size="large" />
                </View>
            )
        }
    }

    renderViewMoreBtn = (remain) => {
        if (remain > 0) {
            let { pageSize, pageIndex, isShowLoading } = this.state;
            let _this = this;
            let title = 'Xem thêm ' + remain + ' nhân viên';
            return (
                <Button
                    title={title}
                    loading={isShowLoading}
                    containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}
                    buttonStyle={{ width: 200 }}
                    onPress={() => {
                        this.setState({ pageIndex: pageIndex + 1 }, () => {
                            _this.getEmployerPaging(this.state.pageSize, this.state.pageIndex, JWT_TOKEN);
                        });
                    }}
                />
            )
        }
    }

    render() {
        let { pageIndex, pageSize, lstItems, isShowLoading, refreshing, remain } = this.state;
        return (
            <View style={styles.container}>
                <EmployerTitle onGoToAddPage={this.onGoToAddPage} />

                <View style={{ paddingBottom: 50 }}>
                    <EmployerItem isRefreshing={refreshing} lstItems={lstItems} viewDetail={this.viewDetail} onRefresh={this.onRefresh} />
                    {this.renderViewMoreBtn(remain)}
                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.onGoToAddPage()}
                    style={{
                        position: 'absolute',
                        right: 15,
                        bottom: 20,
                    }} >
                </TouchableOpacity>

                {this.renderLoading(isShowLoading)}
            </View>
        );
    }
}

export default connect(mapStateToProps, null)(EmployerScreenList);