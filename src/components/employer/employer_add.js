import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, Button, ScrollView } from 'react-native';
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const avatarWidth = 50;
const styles = StyleSheet.create({
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
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
                <Input label='Họ và tên' leftIconContainerStyle={{ marginRight: 10 }} leftIcon={<Icon name='user' size={24} color='black' />} />
            </KeyboardAwareScrollView>

        )
    }
}