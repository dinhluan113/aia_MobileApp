import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Image, StatusBar } from 'react-native';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import Images from '../../../assets/images.js';
import { LinearGradient } from 'expo-linear-gradient';

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
                        <Text style={styles.subTitle}>Quản lý thông tin hợp đồng</Text>
                        <Image style={styles.logoIcon} source={Images.IconLogo} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.handleLogin} activeOpacity={0.7}>
                            <LinearGradient colors={['#29d990', '#0ac5b8']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ alignItems: 'center', padding: 10, borderRadius: 4 }}>
                                <Text style={{ color: '#fff' }}>Đăng nhập</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(null, actions)(LoginScreen);

let ScreenHeight = Dimensions.get("window").height + StatusBar.currentHeight;
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