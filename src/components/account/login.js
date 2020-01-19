import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, StatusBar, TextInput } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Images from '../../../assets/images.js';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const UsersRepository = RepositoryFactory.get('users')

class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        isShowLoading: false,
    }

    handleLogin = () => {
        let dto = {
            'UserName': this.state.email,
            'Password': this.state.password,
        }
        let promise = UsersRepository.checkLogin(dto);
        promise
            .then(function (response) {
                console.log(response.data);
                if (response.data.StatusCode == 200) {
                    this.props.doLogin();
                }
                else if (response.data.StatusCode == 401) {
                    console.log('Xac thuc tai khoan');
                }
                else {
                    alert("Sai tên đăng nhập hoặc mật khẩu");
                }
                return response;
            })
            .catch(function (e) {
                alert("Đã có lỗi xảy ra vui lòng thử lại sau.");
                console.log(e);
            })
            .finally(function () {
            });
    }
    render() {
        const { email, password } = this.state;
        return (

            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraHeight={250}
                style={styles.mainContainer}
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
                        <TextInput autoCompleteType='username' textContentType='username' keyboardType='email-address' style={styles.inputStyle} placeholder='Email' onChangeText={value => this.setState({ email: value })} value={email} />
                        <TextInput autoCompleteType='password' secureTextEntry={true} textContentType='password' style={styles.inputStyle} placeholder=' Mật khẩu' onChangeText={value => this.setState({ password: value })} value={password} />

                        <TouchableOpacity onPress={this.handleLogin} activeOpacity={0.7}>
                            <LinearGradient colors={['#29d990', '#0ac5b8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{
                                alignItems: 'center', padding: 10, borderRadius: 4, width: ScreenWidth - 59, borderRadius: 50, marginTop: 10}}>
                                <Text style={{ color: '#fff' }}>Đăng nhập</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
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
    }
});