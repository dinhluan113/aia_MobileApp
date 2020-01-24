import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const EmployerRepository = RepositoryFactory.get('employer');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10
    }
});

let JWT_TOKEN = '';
export default class EmployertItemAdd extends React.Component {
    componentDidMount = () => {
        if (typeof this.props.navigation.state.params != "undefined") {
            JWT_TOKEN = this.props.navigation.state.params.JWT_TOKEN;
        }
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

    setName = (value) => { this.setState(Object.assign(this.state.objModel, { name: value })); }
    setPhone = (value) => { this.setState(Object.assign(this.state.objModel, { phone: value.split(".").join("") })); }
    setEmail = (value) => { this.setState(Object.assign(this.state.objModel, { email: value.split(".").join("") })); }

    addDTO = () => {
        this.setState({ isShowLoading: true });
        let _this = this;
        let promise = EmployerRepository.Add(this.state.objModel, JWT_TOKEN);
        promise
            .then(function (response) {
                _this.props.navigation.navigate('EmployerScreenList', { isRefresh: true })
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
                        onChangeText={value => this.setEmail(value)} value={objModel.email}/>

                    <Button
                        buttonStyle={{ width: 100 }}
                        title="Lưu"
                        onPress={this.addDTO}
                    />
                </View>
                {this.renderLoading(isShowLoading)}
            </KeyboardAwareScrollView>

        )
    }
}