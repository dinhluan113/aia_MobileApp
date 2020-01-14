import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

import imgAvatar from '../../../assets/imgs/iconfinder_Avatar.png'

export default class HomeScreen extends React.Component {
    state = {
        date: new Date(),
        show: false,
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios' ? true : false,
            date,
        });
    }

    show = () => {
        this.setState({
            show: true,
        });
    }

    render() {
        const { show, date } = this.state;
        return (
            <View style={styles.container} >
                <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topHeader}>
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15, marginTop: 10, marginBottom: 10, marginLeft: 20, textTransform: 'uppercase' }}>My commit</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 110 / 2 }}>
                            <Image source={imgAvatar} style={{ width: 110, height: 110, borderRadius: 110 / 2 }} />
                        </View>
                        <Text style={{ marginTop: 10, marginBottom: 55, color: '#fff' }}>User Name</Text>
                    </View>

                    <View style={{ position: 'absolute', bottom: -19, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.boxInfo}>
                            <TouchableOpacity style={{ flex: 2, justifyContent: 'center' }} activeOpacity={.5} onPress={this.show}>
                                <Text style={[styles.txtSubBoxInfo, { textAlign: 'right' }]}>Choose date</Text>
                                <Text style={{ textAlign: 'right' }}>{parseInt(date.getMonth() + 1) + "/" + date.getFullYear()}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name={'ios-calendar'} size={25} />
                            </View>
                            <TouchableOpacity style={{ flex: 2, justifyContent: 'center' }} activeOpacity={.5} onPress={this.show}>
                                <Text style={[styles.txtSubBoxInfo, { textAlign: 'left' }]}>Commit</Text>
                                <Text>150.000.000 đ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </LinearGradient>

                <Text style={styles.txtTitle}>Lasted contracts</Text>

                {show && <DateTimePicker value={date}
                    mode='date'
                    display="spinner"
                    onChange={this.setDate} />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f9ff',
        flex: 1,
    },
    topHeader: {
        paddingTop: StatusBar.currentHeight,
        minHeight: 200,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        marginBottom: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        position: 'relative',
    },
    boxInfo: {
        backgroundColor: '#fff',
        borderRadius: 110 / 2,
        width: 250,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        flex: 1,
        flexDirection: 'row'
    },
    txtSubBoxInfo: {
        fontSize: 12,
        color: '#8f94a2',
        textDecorationLine: "underline",
        textDecorationColor: "#000"
    },
    ButtonStyle: {
        margin: 10,
    },
    txtTitle: {
        color: '#333',
        fontWeight: '700',
        fontSize: 17,
        margin: 10,
        flex: 1
    },
    TextStyle: {
        color: '#333',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '800',
    },
    Header: {
        backgroundColor: '#67b459'
    }
});