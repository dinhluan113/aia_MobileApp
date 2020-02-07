import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, StatusBar, TextInput, Button, ActivityIndicator, AsyncStorage, Modal, Platform, SafeAreaView, Vibration } from 'react-native';
import base64 from 'react-native-base64'
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Images from '../../../assets/images.js';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import * as LocalAuthentication from 'expo-local-authentication';
const UsersRepository = RepositoryFactory.get('users')

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        tmpPassword: '',
        isShowLoading: false,
        isAuthen: false,
        key1: '',
        key2: '',
        key3: '',
        key4: '',
        modalVisible: true,
        isCanFingerPrint: false,
    }

    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value.toString());
        } catch (e) {
        }
    }

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        } catch (error) {
        }
    };

    scanFingerPrint = async () => {
        try {
            let results = await LocalAuthentication.authenticateAsync();
            if (results.success) {
                this.setState({ password: this.state.tmpPassword }, () => {
                    this.handleLogin();
                })
            } else {
                this.setState({ modalVisible: false, isShowLoading: false }, () => {
                    const DURATION = 2000;
                    Vibration.vibrate(DURATION);
                    Vibration.cancel();
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount = () => {
        let propmisData = this._retrieveData('userObject');
        propmisData.then(async value => {
            if (typeof value != "undefined") {
                let dto = JSON.parse(value);
                await this.setState({ email: dto.UserName, tmpPassword: dto.Password, isCanFingerPrint: dto.Password != "" && dto.UserName != "" });
            }
        });
    };

    handleSubmitAuthen = async () => {
        let { email, key1, key2, key3, key4 } = this.state;
        await this.setState({ isShowLoading: true, modalVisible: false });

        let _token = email + '+' + key1 + key2 + key3 + key4;
        var token = base64.encode(_token);
        let promise = UsersRepository.validate(token);
        const _this = this;
        let dto = {
            'UserName': this.state.email,
            'Password': this.state.password,
        }
        promise
            .then(function (response) {
                let statusCode = parseInt(response.data.statusCode);
                if (statusCode == 200) {
                    _this.storeData('userid', response.data.userss)
                        .then(function () {
                            _this.storeData('userObject', JSON.stringify(dto))
                                .then(function () {
                                    _this.props.doSetToken(response.data.token);
                                    _this.props.doLogin();
                                });
                        });
                }
                else if (statusCode == 401) {
                    _this.setState({ isAuthen: true });
                }
                else {
                    alert("Mã xác thực không hợp lệ");
                }
                return response;
            })
            .catch(function (e) {
                alert("Mã xác thực không hợp lệ");
            })
            .finally(function () {
                _this.setState({ isShowLoading: false });
            });
    }

    handleLogin = async () => {
        await this.setState({ isShowLoading: true, modalVisible: false });
        let dto = {
            'UserName': this.state.email,
            'Password': this.state.password,
        }
        this.props.doSetEmail(dto.UserName);
        let promise = UsersRepository.checkLogin(dto);
        const _this = this;
        promise
            .then(function (response) {
                let statusCode = parseInt(response.data.statusCode);
                if (statusCode == 200) {
                    _this.storeData('userid', response.data.userss)
                        .then(function () {
                            _this.storeData('userObject', JSON.stringify(dto))
                                .then(function () {
                                    _this.props.doSetToken(response.data.token);
                                    _this.props.doLogin();
                                });
                        });
                }
                else if (statusCode == 401) {
                    _this.setState({ isAuthen: true });
                }
                else {
                    alert("Sai tên đăng nhập hoặc mật khẩu");
                }
                return response;
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
            })
            .finally(function () {
                _this.setState({ isShowLoading: false });
            });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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

    renderLogin = (email, password, isShowLoading) => (
        <SafeAreaView style={{ minHeight: ScreenHeight }}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraHeight={100}
                style={styles.mainContainer}
                scrollEnabled={false}
            >
                <View style={styles.containerChild}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title} >Your Contracts.<Text style={styles.titlePrimary}> Greener.</Text></Text>
                        <Text style={styles.subTitle}>Quản lý thông tin hợp đồng</Text>
                        <Image style={styles.logoIcon} source={Images.IconLogo} />
                    </View>
                    <View style={{
                        width: ScreenWidth,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TextInput autoCompleteType='username' textContentType='username' keyboardType='email-address' style={styles.inputStyle}
                            placeholder='Email' onChangeText={value => this.setState({ email: value })} value={email} autoCapitalize='none'
                            onSubmitEditing={() => { this.secondTextInput.focus(); }} returnKeyType='next' />
                        <TextInput autoCompleteType='password' secureTextEntry={true} textContentType='password' style={styles.inputStyle} placeholder=' Mật khẩu' onChangeText={value => this.setState({ password: value })} value={password}
                            returnKeyType='done'
                            ref={(input) => { this.secondTextInput = input; }}
                            onSubmitEditing={this.handleLogin}
                        />

                        <TouchableOpacity onPress={this.handleLogin} activeOpacity={0.7}>
                            <LinearGradient colors={['#29d990', '#0ac5b8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                                alignItems: 'center', padding: 10, borderRadius: 4, width: ScreenWidth - 59, borderRadius: 50, marginTop: 10
                            }}>
                                <Text style={{ color: '#fff' }}>Đăng nhập</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ margin: 10 }}>
                            <View style={{ alignSelf: 'center', position: 'absolute', borderBottomColor: '#777', borderBottomWidth: 1, height: '50%', width: '90%', maxWidth: 280 }} />
                            <Text style={{ alignSelf: 'center', paddingHorizontal: 5, backgroundColor: '#ebeef0', fontSize: 12, color: '#777' }}>Hoặc</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.isCanFingerPrint) {
                                    if (Platform.OS === 'android') {
                                        this.setModalVisible(!this.state.modalVisible);
                                    } else {
                                        this.scanFingerPrint();
                                    }
                                }
                                else {
                                    alert("Bạn cần đăng nhập bằng mật khẩu trước khi sử dụng tính năng này");
                                }
                            }}
                            style={!this.state.isCanFingerPrint ? { opacity: 0.5, alignItems: 'center' } : { opacity: 1, alignItems: 'center' }}
                        >
                            <Image
                                style={{ width: 36, height: 36 }}
                                source={require('../../../assets/imgs/fingerprint.png')}
                            />
                            <Text>
                                Đăng nhập bằng vân tay
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isCanFingerPrint && this.state.modalVisible}
                    onShow={this.scanFingerPrint}>
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <Image
                                style={{ width: 64, height: 64 }}
                                source={require('../../../assets/imgs/fingerprint.png')}
                            />
                            <Text style={{ color: '#666', fontWeight: '700', marginBottom: 10 }}>Fingerprint for "SSContract"</Text>
                            <Text style={{ color: '#666' }}>Sử dụng Vân tay để mở khóa</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    LocalAuthentication.cancelAuthenticate();
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                                style={{ borderTopWidth: 1, borderTopColor: '#f5f5f5', width: 320, textAlign: 'center', padding: 10, alignItems: 'center', marginTop: 15 }}
                            >
                                <Text style={{ color: 'red', fontSize: 16 }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {this.renderLoading(isShowLoading)}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )

    renderAuthentication = (email) => (
        <SafeAreaView style={styles.mainContainer} >
            <View style={{ height: StatusBar.currentHeight }}></View>
            <View style={styles.containerChild}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title} >Your Contracts.<Text style={styles.titlePrimary}> Greener.</Text></Text>
                    <Text style={styles.subTitle}>Quản lý thông tin hợp đồng</Text>
                </View>
                <View style={{
                    width: ScreenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                }}>
                    <Text style={styles.lg_msg}>Mã xác thực đăng ký đã được gửi tới email:</Text>
                    <Text style={[styles.lg_msg, { fontWeight: '700', marginTop: 5, marginBottom: 5 }]}>{email}</Text>
                    <Text style={styles.lg_msg}>Điền mã xác thực để hoàn tất đăng ký.</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TextInput keyboardType='number-pad' style={[styles.inputStyleValid, { marginLeft: 0 }]}
                            onChangeText={value => this.setState({ key1: value }, () => { this.secondTextInput.focus() })} value={this.state.key1} />

                        <TextInput keyboardType='number-pad' style={styles.inputStyleValid}
                            onChangeText={value => this.setState({ key2: value }, () => { this.thirdTextInput.focus() })} value={this.state.key2}
                            ref={(input) => { this.secondTextInput = input; }} />

                        <TextInput keyboardType='number-pad' style={styles.inputStyleValid}
                            onChangeText={value => this.setState({ key3: value }, () => { this.fourTextInput.focus() })} value={this.state.key3}
                            ref={(input) => { this.thirdTextInput = input; }} />

                        <TextInput keyboardType='number-pad' style={styles.inputStyleValid}
                            onChangeText={value => this.setState({ key4: value })} value={this.state.key4}
                            ref={(input) => { this.fourTextInput = input; }}
                            onSubmitEditing={this.handleSubmitAuthen} returnKeyType='done' />
                    </View>
                    <TouchableOpacity onPress={this.handleSubmitAuthen} activeOpacity={0.7}>
                        <LinearGradient colors={['#29d990', '#0ac5b8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                            alignItems: 'center', padding: 10, borderRadius: 4, width: 200, borderRadius: 50, marginTop: 17
                        }}>
                            <Text style={{ color: '#fff' }}>Hoàn tất</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <Text style={styles.lg_msg_smaller}>Nếu bạn không tìm thấy thư xác thực, vui lòng kiểm tra lại trong mục "Thư rác" hoặc thử đăng nhập lại.</Text>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => { this.setState({ isAuthen: false }) }} activeOpacity={0.7}>
                        <Text style={{ color: '#333' }}>Đăng nhập lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

    render() {
        const { email, password, isAuthen, isShowLoading } = this.state;
        if (!isAuthen) {
            return (this.renderLogin(email, password, isShowLoading))
        }
        else
            return (this.renderAuthentication(email))
    }
}

export default connect(null, actions)(LoginScreen);

let ScreenWidth = Dimensions.get("screen").width;
let ScreenHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ebeef0',
    },
    containerChild: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    inputStyle: {
        width: ScreenWidth - 59,
        borderWidth: 1,
        borderColor: '#0ac5b8',
        marginBottom: 10,
        padding: 5,
        paddingLeft: 25,
        borderRadius: 50,
    },
    inputStyleValid: {
        width: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#0ac5b8',
        marginBottom: 10,
        padding: 5,
        marginLeft: 25,
        textAlign: 'center'
    },
    title: {
        fontSize: 25,
        color: '#333',
        fontWeight: '700'
    },
    titlePrimary: {
        color: '#11bbb5'
    },
    subTitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
        marginBottom: 10
    },
    logoIcon: {
        width: 200,
        height: 200,
        margin: 'auto',
        marginBottom: 20
    },
    lg_msg: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },

    lg_msg_smaller: {
        marginTop: 15,
        color: '#999',
        textAlign: 'center',
    },

    modal: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 180,
        borderRadius: 14
    }
});