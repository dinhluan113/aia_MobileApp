import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import NumberFormat from 'react-number-format';

export default class HomeBoxDateCommit extends React.Component {
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
            <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
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
                        <NumberFormat
                            value={150000000}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'₫'}
                            renderText={value => <Text numberOfLines={1}>{value}</Text>}
                        />
                    </TouchableOpacity>
                </View>
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
    },
});