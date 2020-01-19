import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, ScrollView } from 'react-native';
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';

const avatarWidth = 50;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
    }
});

export default class EmployertItemAdd extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Thêm nhân viên mới</Text>
        };
    };

    _scrollToInput(reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    render() {
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
                    <Input containerStyle={{ marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                    <Input containerStyle={{ marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Số điện thoại' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='phone' size={24} color='black' />} keyboardType='phone-pad' />
                    <Input containerStyle={{ marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }} inputContainerStyle={{ borderBottomWidth: 0 }} placeholder='Email' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='envelope-o' size={24} color='black' />} keyboardType='email-address' />

                    <Button
                        buttonStyle={{ minWidth: 100, marginTop: 10 }}
                        title="Lưu"
                    />
                </View>
            </KeyboardAwareScrollView>

        )
    }
}