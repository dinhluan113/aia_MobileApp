import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image, Dimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const ContractRepository = RepositoryFactory.get('contract');

import ContractItem from '../contracts/contract_items';
import StyleGlobal from '../../../assets/stylesGlobal.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;

let _IS_MOUNTED = false;
export default class HomeContent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        lstItems: [],
        updateDate: new Date(),
    }

    componentDidMount = () => {
        this._IS_MOUNTED = true;
        this.getContractPaging();
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
    }

    getContractPaging = () => {
        if (this._IS_MOUNTED == true) {
            let _this = this;
            let promise = ContractRepository.GetAll(5, 0, this.props.JWT_TOKEN, '');
            promise
                .then(function (response) {
                    _this.setState({
                        lstItems: response.data.lst,
                        updateDate: new Date()
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

    viewContractDetail = (id) => {
        this.props.viewContractDetail(id);
    }

    renderFormatDate = (date) => {
        let hour = date.getHours().toString();
        let min = date.getMinutes() > 10 ? date.getMinutes().toString() : '0' + date.getMinutes().toString();
        let sec = date.getSeconds() > 10 ? date.getSeconds().toString() : '0' + date.getSeconds().toString();
        let day = date.getDate() > 10 ? date.getDate().toString() : '0' + date.getDate().toString();
        let month = date.getMonth() > 10 ? date.getMonth().toString() : '0' + date.getMonth().toString();
        let year = date.getFullYear();
        return hour + ':' + min + ':' + sec + ' ' + day + '/' + month + '/' + year;
    }

    renderContractItem = (lstItems) => {
        if (lstItems != null) {
            return lstItems.map((item) => {
                return (
                    <TouchableOpacity style={[styles.boxActivity, StyleGlobal.boxShadowSoft]} activeOpacity={.5} onPress={() => { this.viewContractDetail(item.id) }} key={item.id} >
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>{item.contractId}</Text>
                                <Text style={{ flex: 1, textAlign: 'right', color: '#8f94a2', fontSize: 12 }}>{item.dateCreated}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Khách hàng</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.customer_Name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Nhân viên</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.userName}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12, textAlign: 'right' }}>NFYP</Text>
                                    <NumberFormat
                                        value={item.nfyp}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'₫'}
                                        renderText={value => <Text numberOfLines={1} style={{ textAlign: 'right' }}>{value}</Text>}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
        }
    }

    render() {
        let { lstItems, updateDate } = this.state;
        return (
            <View style={{ backgroundColor: '#f0f9ff' }}>
                <View style={{ padding: 20, flex: 1, flexDirection: 'column', paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.boxDetail, StyleGlobal.boxShadowSoft, { marginRight: 10 }]} activeOpacity={.5} onPress={this.show}>
                            <Text style={{ color: '#8f94a2', fontSize: 12 }}>FYP</Text>
                            <NumberFormat
                                value={this.props.crrFYP}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'₫'}
                                renderText={value => <Text style={{ color: '#333', fontSize: 17 }} numberOfLines={1}>{value}</Text>}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boxDetail, StyleGlobal.boxShadowSoft, { marginLeft: 10 }]} activeOpacity={.5} onPress={this.show}>
                            <Text style={{ color: '#8f94a2', fontSize: 12 }}>Need to do</Text>
                            <NumberFormat
                                value={this.props.crrNeedToDo}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'₫'}
                                renderText={value => <Text style={{ color: '#333', fontSize: 17 }} numberOfLines={1}>{value}</Text>}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 20, flex: 1, flexDirection: 'column', minHeight: SCREEN_HEIGHT - 120 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.txtTitle, { flex: 1 }]}>Hợp đồng mới nhất</Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.getContractPaging}>
                            <Ionicons name={'md-refresh'} size={22} color='#2089dc' />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ flex: 1, fontSize: 13, color: '#999', marginTop: 5, marginBottom: 1 }}>Cập nhật lúc: {this.renderFormatDate(updateDate)}</Text>
                    </View>
                    {
                        this.renderContractItem(lstItems)
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxDetail: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 100,
        borderRadius: 10
    },
    txtTitle: {
        color: '#333',
        fontWeight: '700',
        fontSize: 17,
    },
    TextStyle: {
        color: '#333',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '800',
    },
    boxActivity: {
        flex: 1, justifyContent: 'center', backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        flexDirection: 'row',
        borderLeftColor: '#012456',
        borderLeftWidth: 2,
        maxHeight: 90
    },
});