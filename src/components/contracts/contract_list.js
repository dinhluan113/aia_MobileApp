import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import { SearchBar, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

import ContractItem from './contract_items';
import StyleGlobal from '../../../assets/stylesGlobal.js';

import { Provider, connect } from 'react-redux';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const ContractRepository = RepositoryFactory.get('contract');


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

class ContractTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.setState({ search: this.props.searchKeyword })
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
                <Text style={{ position: 'absolute', left: 50, right: 50, top: 12, textAlign: 'center', color: '#fff', fontSize: 17, fontWeight: '700' }}>Danh sách hợp đồng</Text>
                {
                    isShowSearchBox ?
                        <SearchBar
                            platform='ios'
                            placeholder="Tìm kiếm hợp đồng..."
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


class ContractSearchBox extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search }, () => {
            this.props.onChangeKW(search);
        });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                platform='ios'
                placeholder="Tìm kiếm nhân viên..."
                onChangeText={this.updateSearch}
                onCancel={this.updateSearch}
                containerStyle={{ backgroundColor: 'transparent' }}
                inputContainerStyle={{ backgroundColor: '#fff' }}
                value={search}
                cancelButtonTitle='Hủy'
                cancelButtonProps={{ buttonTextStyle: { color: '#fff' } }}
            />
        );
    }
}


const mapStateToProps = state => ({
    getJWTToken: state.getJWTToken,
});

let _IS_MOUNTED = false;

class ContractScreenList extends React.Component {

    constructor(props) {
        super(props);
        JWT_TOKEN = this.props.getJWTToken;

    }

    state = {
        searchKeyword: '',
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
        //this.getContractPaging(pageSize, pageIndex, JWT_TOKEN);

        this.props.navigation.addListener('willFocus', () => {
            if (this._IS_MOUNTED) {
                this.setState({ refreshing: true, pageIndex: 0 }, () => {
                    this.getContractPaging(pageSize, pageIndex, JWT_TOKEN);
                })
            }
        })
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
        this.setState({ pageIndex: 0 });
    }

    getContractPaging = (pageSize, pageIndex, JWT_TOKEN) => {
        this.setState({ isShowLoading: true });
        let _this = this;
        let promise = ContractRepository.GetAll(pageSize, pageIndex, JWT_TOKEN, this.state.searchKeyword);
        promise
            .then(function (response) {
                if (_this._IS_MOUNTED == true) {
                    let crrList = _this.state.lstItems;
                    crrList = crrList.concat(response.data.lst);
                    if (pageIndex > 0) {
                        _this.setState({
                            lstItems: crrList,
                            remain: response.data.remain,
                        });
                    }
                    else {
                        _this.setState({
                            lstItems: response.data.lst,
                            remain: response.data.remain,
                        });
                    }
                }
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                console.log(e);
                //_this.props.doLogout();
            })
            .finally(function () {
                _this.setState({ isShowLoading: false, refreshing: false });
            });
    }

    onRefresh = () => {
        this.setState({ refreshing: true, pageIndex: 0 }, () => {
            this.getContractPaging(this.state.pageSize, this.state.pageIndex, JWT_TOKEN);
        });
    }

    onChangeSearch = (searchKeyword) => {
        this.setState({ searchKeyword: searchKeyword }, () => {
            let { pageIndex, pageSize } = this.state;
            this.getContractPaging(pageSize, pageIndex, JWT_TOKEN);
        });
    }

    onGoToAddPage = () => {
        this.props.navigation.navigate({ routeName: 'ContractItemAdd' })
    }

    viewContractDetail = (id) => {
        this.props.navigation.navigate('ContractItemEdit', { itemId: id })
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
            let title = 'Xem thêm ' + remain + ' hợp đồng';
            return (
                <Button
                    title={title}
                    loading={isShowLoading}
                    containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}
                    buttonStyle={{ width: 200 }}
                    onPress={() => {
                        this.setState({ pageIndex: pageIndex + 1 }, () => {
                            _this.getContractPaging(this.state.pageSize, this.state.pageIndex, JWT_TOKEN);
                        });
                    }}
                />
            )
        }
    }


    //            <ScrollView style={{ flex: 1, flexDirection: 'column', paddingLeft: 10, paddingRight: 10 }}
    //refreshControl={
    //    <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
    //}>
    render() {
        let { pageIndex, pageSize, lstItems, isShowLoading, refreshing, remain, searchKeyword } = this.state;
        return (
            <View style={styles.container}>
                <ContractTitle searchKeyword={searchKeyword} onChangeKW={this.onChangeSearch} onGoToAddPage={this.onGoToAddPage} />

                <View style={{ paddingBottom: 50 }}>
                    <ContractItem isRefreshing={refreshing} lstItems={lstItems} viewContractDetail={this.viewContractDetail} onRefresh={this.onRefresh} />
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

                    {/*<LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25 }, StyleGlobal.boxShadowHeavy]}>
                        <Ionicons name={'ios-add'} size={25} color='#fff' />
                    </LinearGradient>*/}
                </TouchableOpacity>

                {this.renderLoading(isShowLoading)}
            </View>
        );
    }
}

export default connect(mapStateToProps, null)(ContractScreenList);