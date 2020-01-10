import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, Dimensions, Image } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Images from '../../../assets/images.js';
import GradientButton from 'react-native-gradient-buttons';

class LoginScreen extends Component {
    handleLogin = () => {
        this.props.doLogin();
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.containerChild}>
                        <Text style={styles.title} >Your Home.<Text style={styles.titlePrimary}> Greener.</Text></Text>
                        <Text style={styles.subTitle}>Quản lý nhà trọ thông minh</Text>
                        <Image style={styles.logoIcon} source={Images.IconLogo} />
                    </View>
                    <View>
                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Đăng nhập"
                            textStyle={{ fontSize: 16 }}
                            gradientBegin="#0ac5b8"
                            gradientEnd="#29d990"
                            gradientDirection="diagonal"
                            height={45}
                            width={250}
                            radius={7}
                            impact
                            impactStyle='Light'
                            onPressAction={this.handleLogin}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loginStatus: state.loginStatus
});

export default connect(mapStateToProps, actions)(LoginScreen);

let ScreenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ebeef0',
        height: ScreenHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerChild: {
        alignItems: 'center',
        justifyContent: 'center'
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