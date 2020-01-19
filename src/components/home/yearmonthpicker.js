/*
 * @Author: ashoka 
 * @Date: 2018-05-20 14:40:24 
 */
import React, { Component } from 'react';
import {
    View,
    Picker,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

export default class YearMonthPicker extends Component {
    constructor(props) {
        super(props);
        let { startYear, endYear, selectedYear, selectedMonth, visiable } = props;
        let years = this.getYears(startYear, endYear);
        let months = this.getMonths();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        this.state = {
            years,
            months,
            selectedYear,
            selectedMonth,
            visiable: visiable || false
        }
    }

    show = async ({ startYear, endYear, selectedYear, selectedMonth }) => {
        let years = this.getYears(startYear, endYear);
        let months = this.getMonths();
        selectedYear = selectedYear || years[0];
        selectedMonth = selectedMonth || ((new Date()).getMonth() + 1);
        let promise = new Promise((resolve) => {
            this.confirm = (year, month) => {
                resolve({
                    year,
                    month
                });
            }
            this.setState({
                visiable: true,
                years,
                months,
                startYear: startYear,
                endYear: endYear,
                selectedYear: selectedYear,
                selectedMonth: selectedMonth,
            })
        })
        return promise;
    }

    dismiss = () => {
        this.setState({
            visiable: false
        })
    }

    getYears = (startYear, endYear) => {
        startYear = startYear || (new Date()).getFullYear();
        endYear = endYear || (new Date()).getFullYear();
        let years = []
        for (let i = startYear; i <= endYear; i++) {
            years.push(i)
        }
        return years;
    }

    getMonths = () => {
        let months = []
        for (let i = 1; i <= 12; i++) {
            months.push(i);
        }
        return months;
    }

    renderPickerItems = (data) => {
        let items = data.map((value, index) => {
            return (<Picker.Item key={'r-' + index} label={'' + value} value={value} />)
        })
        return items;
    }

    onConfirmPress = () => {
        const confirm = this.confirm;
        const { selectedYear, selectedMonth } = this.state;
        confirm && confirm(selectedYear, selectedMonth);
        this.dismiss();
    }

    render() {
        const { years, months, selectedYear, selectedMonth, visiable } = this.state;
        if (!visiable) return null;
        return (
            <View style={styles.modal}>
                <View style={styles.outerContainer}>
                    <View style={styles.innerContainer}>
                        <Picker
                            style={{
                                flex: 1, maxWidth: 85, justifyContent: 'center', alignItems: 'center',
                            }}
                            itemStyle={{ alignItems: 'center',}}
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedMonth: itemValue })}
                        >
                            {this.renderPickerItems(months)}
                        </Picker>
                        <Picker
                            style={{ flex: 1 }}
                            itemStyle={{ alignItems: 'center', }}
                            selectedValue={selectedYear}
                            onValueChange={(itemValue, itemIndex) => this.setState({ selectedYear: itemValue })}
                        >
                            {this.renderPickerItems(years)}
                        </Picker>
                        <TouchableOpacity style={styles.toolBarButton} onPress={this.onConfirmPress}>
                            <Ionicons name={'ios-save'} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        maxWidth: 290,
        backgroundColor: 'transparent',
    },
    outerContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 110 / 2,
        paddingLeft: 10
    },
    toolBarButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 65,
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#999',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})