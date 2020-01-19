import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import NumberFormat from 'react-number-format';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import YearMonthPicker from './yearmonthpicker.js';

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const _startYear = 2019;
const _endYear = _startYear + 5;


class HomeBoxDateCommit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startYear: _startYear,
            endYear: _endYear          
        }
    }

    showPicker = () => {
        const { startYear, endYear } = this.state;
        let selectedDate = this.props.getCurrentDate;
        let selectedMonth = selectedDate.Month;
        let selectedYear = selectedDate.Year
        this.picker
            .show({ startYear, endYear, selectedYear, selectedMonth })
            .then(({ year, month }) => {
                this.props.doSetcrrDate({ 'Month': month, 'Year': year});
            });
    }

    render() {
        let selectedDate = this.props.getCurrentDate;
        let selectedMonth = selectedDate.Month;
        let selectedYear = selectedDate.Year
        return (
            <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.boxInfo, StyleGlobal.boxShadowHeavy]}>
                    <TouchableOpacity style={{ flex: 2, justifyContent: 'center' }} activeOpacity={.5} onPress={this.showPicker}>
                        <Text style={[styles.txtSubBoxInfo, { textAlign: 'right' }]}>Tháng/Năm</Text>
                        <Text style={{ textAlign: 'right' }}>{selectedMonth + "/" + selectedYear}</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={'ios-calendar'} size={25} />
                    </View>
                    <TouchableOpacity style={{ flex: 2, justifyContent: 'center' }} activeOpacity={.5} onPress={this.showPicker}>
                        <Text style={[styles.txtSubBoxInfo, { textAlign: 'left' }]}>Commit</Text>
                        <NumberFormat
                            value={150000000}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'₫'}
                            renderText={value => <Text numberOfLines={1}>{value}</Text>}
                        />
                    </TouchableOpacity>
                    <YearMonthPicker
                        ref={(picker) => this.picker = picker}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxInfo: {
        backgroundColor: '#fff',
        borderRadius: 110 / 2,
        width: 290,
        height: 60,
        flex: 1,
        flexDirection: 'row'
    },
    txtSubBoxInfo: {
        fontSize: 12,
        color: '#8f94a2',
    },
});

const mapStateToProps = state => ({
    getCurrentDate: state.getCurrentDate,
});

export default connect(mapStateToProps, actions)(HomeBoxDateCommit);