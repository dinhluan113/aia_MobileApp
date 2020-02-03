import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, ScrollView, Dimensions, Picker, ActivityIndicator, Alert} from 'react-native';
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const EmployerRepository = RepositoryFactory.get('employer');

const SCREEN_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10
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
let _IS_MOUNTED = false;
export default class EmployerItemEdit extends React.Component {
    componentDidMount = () => {
        this._IS_MOUNTED = true;
        if (typeof this.props.navigation.state.params != "undefined") {
            JWT_TOKEN = this.props.navigation.state.params.JWT_TOKEN;
            this.setState({ isShowLoading: true });
            let _this = this;
            EmployerRepository.GetById(this.props.navigation.state.params.itemId, JWT_TOKEN)
                .then((response) => {
                    let model = response.data;                    
                    this.setObject(model);
                })
                .catch(function (e) {
                    alert("Không thể tải thông tin hợp đồng. Vui lòng thử lại sau.");
                })
                .finally(function () {
                    if (_this._IS_MOUNTED)
                        _this.setState({ isShowLoading: false });
                });
        }
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
    }

    state = {
        objModel: {
            id: 0,
            name: '',
            phone: '',
            email: '',
            dateCreated: new Date(),
        },
        isShowLoading: false,
    }

    setObject = (obj) => {
        if (this._IS_MOUNTED) {
            this.setState(Object.assign(
                this.state.objModel, {
                id: obj.id,
                name: obj.name,
                phone: obj.phone,
                email: obj.email,
                dateCreated: new Date(obj.dateCreated),
            }));
        }
    }
    setName = (value) => { this.setState(Object.assign(this.state.objModel, { name: value })); }
    setPhone = (value) => { this.setState(Object.assign(this.state.objModel, { phone: value })); }
    setEmail = (value) => { this.setState(Object.assign(this.state.objModel, { email: value })); }

    addDTO = () => {
        if (this._IS_MOUNTED) {
            this.setState({ isShowLoading: true });
            let _this = this;
            let promise = EmployerRepository.Update(this.state.objModel, JWT_TOKEN);
            promise
                .then(function (response) {
                    _this.props.navigation.navigate('EmployerScreenList', { isRefresh: true })
                })
                .catch(function (e) {
                    alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                })
                .finally(function () {
                    if (_this._IS_MOUNTED)
                        _this.setState({ isShowLoading: false });
                });
        }
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
            'Bạn có chắc chắn muốn xóa nhân viên "' + this.state.name + '" không?\nLưu ý: Hành động này sẽ xóa toàn bộ hợp đồng mà nhân viên này đã ký.',
            [
                { text: 'Hủy', style: 'cancel', },
                {
                    text: 'Xóa', onPress: () => {
                        this.setState({ isShowLoading: true });
                        let _this = this;
                        let promise = EmployerRepository.Delete(this.state.objModel.id, JWT_TOKEN);
                        promise
                            .then(function (response) {
                                alert("Đã xóa thành công.");
                                _this.props.navigation.navigate('EmployerScreenList', { isRefresh: true })
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
        let { objModel, isShowLoading } = this.state;
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
            >
                <View style={{ alignItems: 'center', padding: 17 }}>
                    <View style={[{ width: 105, height: 105, borderRadius: 105 / 2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }, StyleGlobal.boxShadowSoft]}>
                        <Image source={ListImages.EmployerDefaltAvatar} style={{ width: 100, height: 100, borderRadius: 100 / 2 }} />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Input containerStyle={styles.input} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Họ và tên'
                        leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />}
                        autoCapitalize='words'
                        onSubmitEditing={() => { this.secondTextInput.focus(); }} returnKeyType='next'
                        onChangeText={value => this.setName(value)} value={objModel.name}
                    />
                    <Input containerStyle={styles.input} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Số điện thoại'
                        leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='phone' size={24} color='black' />}
                        keyboardType='phone-pad'
                        ref={(input) => { this.secondTextInput = input; }}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }} returnKeyType='next'
                        onChangeText={value => this.setPhone(value)} value={objModel.phone}
                    />
                    <Input containerStyle={styles.input} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Email'
                        leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='envelope-o' size={24} color='black' />}
                        keyboardType='email-address'
                        returnKeyType='done' ref={(input) => { this.thirdTextInput = input; }}
                        onSubmitEditing={this.addDTO} autoCapitalize='none'
                        onChangeText={value => this.setEmail(value)} value={objModel.email} />

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
                        title="Xóa nhân viên"
                        onPress={this.onDelete}
                    />

                </View>
                {this.renderLoading(isShowLoading)}
            </KeyboardAwareScrollView>

        )
    }
}