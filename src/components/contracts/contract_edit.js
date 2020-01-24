import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, ScrollView, Dimensions, Picker, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { TextInputMask } from 'react-native-masked-text'
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const ContractRepository = RepositoryFactory.get('contract');
const EmployerRepository = RepositoryFactory.get('employer');
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const avatarWidth = 50;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
    },
    inputContainerStyle: {
        marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10
    },
    frmInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 5
    },
    lblInput: {
        color: '#008aff',
    },
});

let JWT_TOKEN = '';
class ContractItemEdit extends React.Component {
    state = {
        objModel: {
            Id: 0,
            ContractId: '',
            Nfyp: 0,
            Rfyp: 0,
            EmployerId: 0,
            TypeId: 1,
            PhiTruot: 0,
            Customer_Name: '',
            Customer_Phone: '',
            DateCreated: new Date(),
            ContractType: 1
        },
        lstEmployer: [],
        showDatePicker: false,
        isShowLoading: false,
    }

    componentDidMount = () => {
        JWT_TOKEN = this.props.getJWTToken;
        this.setState({ isShowLoading: true });
        let _this = this;
        ContractRepository.GetById(this.props.navigation.state.params.itemId, JWT_TOKEN)
            .then((response) => {
                let model = response.data;
                this.setObject(model);
            })
            .then(() => {
                EmployerRepository.GetAll(1000, 0, JWT_TOKEN)
                    .then(function (response) {
                        _this.setState({ lstEmployer: response.data.lstEmpl });
                    })
                    .catch(function (e) {
                        alert("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.");
                    })
            })
            .catch(function (e) {
                alert("Không thể tải thông tin hợp đồng. Vui lòng thử lại sau.");
            })
            .finally(function () {
                _this.setState({ isShowLoading: false });
            });
    }

    setObject = (obj) => {
        this.setState(Object.assign(
            this.state.objModel, {
            Id: obj.id,
            ContractId: obj.contractId,
            Nfyp: obj.nfyp,
            Rfyp: obj.rfyp,
            PhiTruot: obj.phiTruot,
            Customer_Name: obj.customer_Name,
            Customer_Phone: obj.customer_Phone,
            EmployerId: obj.employerId,
            DateCreated: new Date(obj.dateCreated),
        }));
    }

    setContractId = (value) => { this.setState(Object.assign(this.state.objModel, { ContractId: value })); }
    setNfyp = (value) => { this.setState(Object.assign(this.state.objModel, { Nfyp: value.split(".").join("") })); }
    setRfyp = (value) => { this.setState(Object.assign(this.state.objModel, { Rfyp: value.split(".").join("") })); }
    setPhiTruot = (value) => { this.setState(Object.assign(this.state.objModel, { PhiTruot: value.split(".").join("") })); }
    setCusName = (value) => { this.setState(Object.assign(this.state.objModel, { Customer_Name: value })); }
    setCusPhone = (value) => { this.setState(Object.assign(this.state.objModel, { Customer_Phone: value })); }
    setEmployerId = (itemValue, itemIndex) => { this.setState(Object.assign(this.state.objModel, { EmployerId: itemValue })); }
    setDate = (event, date) => {
        this.setState({ showDatePicker: false }, () => {
            if (date !== undefined)
                this.setState(Object.assign(this.state.objModel, { DateCreated: date }));
        });
    }
    showDatePopup = () => {
        this.setState({
            showDatePicker: true,
        });
    }
    getFormatedDate = (date) => {
        return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + date.getFullYear();
    }

    renderEmployerItems = (data) => {
        let items = data.map((value, index) => {
            return (<Picker.Item key={'r-' + index} label={'' + value.name} value={value.id} />)
        })
        return items;
    }

    addDTO = () => {
        this.setState({ isShowLoading: true });
        let _this = this;
        let promise = ContractRepository.Update(this.state.objModel, JWT_TOKEN);
        promise
            .then(function (response) {
                alert("Đã lưu thông tin thành công.");
                _this.props.navigation.navigate('ContractScreenList', { isRefresh: true })
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                _this.props.doLogout();
            })
            .finally(function () {
                _this.setState({ isShowLoading: false });
            });
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
    onDelete = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa hợp đồng "' + this.state.ContractId + '" không?',
            [
                { text: 'Hủy', style: 'cancel', },
                {
                    text: 'Xóa', onPress: () => {
                        this.setState({ isShowLoading: true });
                        let _this = this;
                        let promise = ContractRepository.Delete(this.state.objModel.Id, JWT_TOKEN);
                        promise
                            .then(function (response) {
                                alert("Đã xóa thành công.");
                                _this.props.navigation.navigate('ContractScreenList', { isRefresh: true })
                            })
                            .catch(function (e) {
                                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                            })
                            .finally(function () {
                                _this.setState({ isShowLoading: false });
                            });
                    }
                },
            ],
            { cancelable: true },
        );
    }

    render() {
        let { objModel, showDatePicker, lstEmployer, isShowLoading } = this.state;
        const inputOption = { precision: 0, separator: '', delimiter: '.', unit: '', suffixUnit: '' };
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
            >
                <View style={[styles.frmInput, { flexDirection: 'row', marginTop: 20 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Mã hợp đồng</Text>
                        <TextInput placeholder='Mã hợp đồng' onChangeText={value => this.setContractId(value)}
                            value={this.state.objModel.ContractId} />
                    </View>
                </View>
                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>NFYP</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={this.state.objModel.Nfyp} onChangeText={value => { this.setNfyp(value) }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>RFYP</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={this.state.objModel.Rfyp} onChangeText={value => { this.setRfyp(value) }} />
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Phí trượt</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={this.state.objModel.PhiTruot} onChangeText={value => { this.setPhiTruot(value) }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Ngày tạo hợp đồng</Text>
                        <TouchableOpacity onPress={this.showDatePopup}>
                            <Text>{this.getFormatedDate(this.state.objModel.DateCreated)}</Text>
                        </TouchableOpacity>

                        {showDatePicker && <DateTimePicker value={this.state.objModel.DateCreated}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
                        }
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Tên khách hàng</Text>
                        <TextInput autoCapitalize='words' placeholder='Tên khách hàng' onChangeText={value => this.setCusName(value)}
                            value={this.state.objModel.Customer_Name} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Số điện thoại</Text>
                        <TextInput keyboardType='phone-pad' placeholder='Số điện thoại khách hàng' onChangeText={value => this.setCusPhone(value)}
                            value={this.state.objModel.Customer_Phone} />
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Nhân viên</Text>
                        <Picker style={{ flex: 1 }} selectedValue={this.state.objModel.EmployerId}
                            onValueChange={(itemValue, itemIndex) => this.setEmployerId(itemValue, itemIndex)} >
                            {this.renderEmployerItems(lstEmployer)}
                        </Picker>
                    </View>
                </View>

                <Button
                    containerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: 15, }}
                    buttonStyle={{ width: 200 }}
                    title="Lưu"
                    onPress={this.addDTO}
                />

                <Button
                    containerStyle={{ justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#e1e1e1', paddingTop: 15, alignItems: 'center', marginTop: 15, marginBottom: 15, }}
                    type="clear"
                    buttonStyle={{ width: 200 }}
                    titleStyle={{ color: 'red' }}
                    title="Xóa hợp đồng"
                    onPress={this.onDelete}
                />
                {this.renderLoading(isShowLoading)}
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = state => ({
    getJWTToken: state.getJWTToken,
});

export default connect(mapStateToProps, null)(ContractItemEdit);