import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import YearMonthPicker from './yearmonthpicker.js';
import { TextInputMask } from 'react-native-masked-text'

import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

const _startYear = 2019;
const _endYear = _startYear + 5;

let JWT_TOKEN = '';
class CommitBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _commitValue: props.crrCommit
        }
    }

    componentDidMount = () => {
    }

    onConfirmCommit = () => {
        this.props.changeCommitValue(this.state._commitValue);
    }

    onCancel = () => {
        this.props.onCancelCommit();
    }

    render() {
        const inputOption = { precision: 0, separator: '', delimiter: '.', unit: '', suffixUnit: '' };
        if (this.props.isShowCommit) {
            return (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, maxWidth: 290, backgroundColor: 'transparent', }}>
                    <View style={{ backgroundColor: 'white', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 110 / 2, paddingLeft: 25 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInputMask type={'money'} options={inputOption}
                                style={{ flex: 1 }}
                                value={this.state._commitValue} onChangeText={value => {
                                    this.setState({ _commitValue: value.split(".").join("") });
                                }} />

                            <TouchableOpacity style={{ height: 44, justifyContent: 'center', alignItems: 'center', maxWidth: 65, flex: 1, borderLeftWidth: 1, borderLeftColor: '#999', }} onPress={this.onConfirmCommit}>
                                <Ionicons name={'ios-save'} size={22} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 44, justifyContent: 'center', alignItems: 'center', maxWidth: 65, flex: 1, borderLeftWidth: 1, borderLeftColor: '#999', }} onPress={this.onCancel}>
                                <Ionicons name={'md-arrow-back'} size={22} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>)
        }
        else {
            return (
                <View></View>
            )
        }
    }
}

class HomeBoxDateCommit extends React.Component {
    constructor(props) {
        super(props)
        JWT_TOKEN = this.props.getJWTToken;
        let selectedDate = this.props.getCurrentDate;
    }

    state = {
        startYear: _startYear,
        endYear: _endYear,
        commit: 0,
        showCommit: false,
    }

    showPicker = () => {
        const { startYear, endYear } = this.state;
        let selectedDate = this.props.getCurrentDate;
        let selectedMonth = selectedDate.Month;
        let selectedYear = selectedDate.Year
        this.picker
            .show({ startYear, endYear, selectedYear, selectedMonth })
            .then(({ year, month }) => {
                this.props.doSetcrrDate({ 'Month': month, 'Year': year });
                this.props.onChangeDate(month, year);
            });
    }

    showCommit = () => {
        this.setState({ showCommit: true });
    }

    changeCommitValue = (value) => {
        this.setState({ showCommit: false }, () => {
            this.props.onChangeCommit(value);
        });
    }

    onCancelCommit = () => {
        this.setState({ showCommit: false });
    }

    render() {

        let selectedDate = this.props.getCurrentDate;
        let { commit, showCommit } = this.state;
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
                    <TouchableOpacity style={{ flex: 2, justifyContent: 'center' }} activeOpacity={.5} onPress={this.showCommit}>
                        <Text style={[styles.txtSubBoxInfo, { textAlign: 'left' }]}>Commit</Text>
                        <NumberFormat
                            value={this.props.crrCommit}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'₫'}
                            renderText={value => <Text numberOfLines={1}>{value}</Text>}
                        />
                    </TouchableOpacity>
                    <YearMonthPicker
                        ref={(picker) => this.picker = picker}
                    />

                    <CommitBox isShowCommit={showCommit} crrCommit={this.props.crrCommit} changeCommitValue={this.changeCommitValue} onCancelCommit={this.onCancelCommit} />
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
    getJWTToken: state.getJWTToken,
});

export default connect(mapStateToProps, actions)(HomeBoxDateCommit);