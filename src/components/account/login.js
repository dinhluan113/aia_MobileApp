import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, StatusBar, TextInput, Button, ActivityIndicator, AsyncStorage } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Images from '../../../assets/images.js';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const UsersRepository = RepositoryFactory.get('users')

class LoginScreen extends Component {
    state = {
        email: 'demoaccount@gmail.com',
        password: '1',
        isShowLoading: false,
        isAuthen: false,
    }

    storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
        }
    }

    handleLogin = () => {
        this.setState({ isShowLoading: true });
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
                    _this.storeData('jwt', response.data.token).then(function () {
                        _this.props.doSetToken(response.data.token);
                        _this.props.doLogin();
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
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraHeight={100}
            style={styles.mainContainer}
            scrollEnabled={false}
        >
            <View style={[styles.mainContainer, styles.containerChild]}>
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
                        placeholder='Email' onChangeText={value => this.setState({ email: value })} value={email}
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
                </View>
            </View>

            {this.renderLoading(isShowLoading)}
        </KeyboardAwareScrollView>
    )

    renderAuthentication = (email) => (
        <View style={styles.mainContainer} >
            <View style={[styles.mainContainer, styles.containerChild]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title} >Your Contracts.<Text style={styles.titlePrimary}> Greener.</Text></Text>
                    <Text style={styles.subTitle}>Quản lý thông tin hợp đồng</Text>
                    <Image style={styles.logoIcon} source={Images.IconLogo} />
                </View>
                <View style={{
                    width: ScreenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 10,
                    paddingRight: 10,
                }}>
                    <Text style={styles.lg_msg}>Thư xác thực đăng ký đã được gửi tới</Text>
                    <Text style={[styles.lg_msg, { fontWeight: '700' }]}>{email}</Text>
                    <Text style={styles.lg_msg}>Mở liên kết trong thư để hoàn tất đăng ký.</Text>
                    <Text style={styles.lg_msg_smaller}>Nếu bạn không tìm thấy thư xác thực, vui lòng kiểm tra lại trong mục "Thư rác" hoặc thử đăng nhập lại.</Text>

                    <TouchableOpacity onPress={() => { this.setState({ isAuthen: false }) }} activeOpacity={0.7}>
                        <LinearGradient colors={['#29d990', '#0ac5b8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                            alignItems: 'center', padding: 10, borderRadius: 4, width: 200, borderRadius: 50, marginTop: 17
                        }}>
                            <Text style={{ color: '#fff' }}>Đăng nhập lại</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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

let ScreenWidth = Dimensions.get("window").width;
let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ebeef0',
        height: ScreenHeight + StatusBar.currentHeight,
    },
    containerChild: {
        alignItems: 'center',
        justifyContent: 'center'
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
    }
});