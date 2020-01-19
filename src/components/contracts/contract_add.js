import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image, ScrollView, Dimensions, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { TextInputMask } from 'react-native-masked-text'
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_WIDTH = Dimensions.get('window').width;
const avatarWidth = 50;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
    },
    inputContainerStyle: {
        marginBottom: 10, backgroundColor: '#fff', marginLeft: 10, marginRight: 10
    },
    frmInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 5
    },
    lblInput: {
        color: '#008aff',
    },
});

export default class ContractItemAdd extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text>Thêm hợp đồng mới</Text>
        };
    };

    _scrollToInput(reactNode: any) {
        // Add a 'scroll' ref to your ScrollView
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    state = {
        objModel: {
            Id: 0,
            Nfyp: 0,
            Rfyp: 0,
            EmployerId: 0,
            TypeId: 0,
            PhiTruot: 0,
            Customer_Name: '',
            Customer_Phone: '',
            DateCreated: new Date(),
            ContractType: 0
        },
        lstEmployer: [{ id: 0, name: 'Tào Thị Le' }, { id: 1, name: 'Te La Lá' }],
        showDatePicker: false,
    }

    setNfyp = (value) => { this.setState(Object.assign(this.state.objModel, { Nfyp: value })); }
    setRfyp = (value) => { this.setState(Object.assign(this.state.objModel, { Rfyp: value })); }
    setPhiTruot = (value) => { this.setState(Object.assign(this.state.objModel, { PhiTruot: value })); }
    setCusName = (value) => { this.setState(Object.assign(this.state.objModel, { Customer_Name: value })); }
    setCusPhone = (value) => { this.setState(Object.assign(this.state.objModel, { Customer_Phone: value })); }
    setEmployerId = (itemValue, itemIndex) => { this.setState(Object.assign(this.state.objModel, { EmployerId: itemValue })); }
    setDate = (event, date) => {
        if (date !== undefined)
            this.setState(Object.assign(this.state.objModel, { DateCreated: date }));
        this.setState({ showDatePicker: false });
    }
    showDatePopup = () => {
        this.setState({
            showDatePicker: true,
        });
    }
    getFormatedDate = (date) => {
        return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + date.getFullYear();
    }

    renderEmployerItems = (data) => {
        let items = data.map((value, index) => {
            return (<Picker.Item key={'r-' + index} label={'' + value.name} value={value.id} />)
        })
        return items;
    }

    render() {
        const { objModel, showDatePicker, lstEmployer } = this.state;
        const inputOption = { precision: 0, separator: '', delimiter: '.', unit: '', suffixUnit: '' };
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
                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>NFYP</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={objModel.Nfyp} onChangeText={value => { this.setNfyp(value) }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>RFYP</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={objModel.Rfyp} onChangeText={value => { this.setRfyp(value) }} />
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Phí trượt</Text>
                        <TextInputMask type={'money'} options={inputOption}
                            value={objModel.PhiTruot} onChangeText={value => { this.setPhiTruot(value) }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Ngày tạo hợp đồng</Text>
                        <TouchableOpacity onPress={this.showDatePopup}>
                            <Text>{this.getFormatedDate(objModel.DateCreated)}</Text>
                        </TouchableOpacity>

                        {showDatePicker && <DateTimePicker value={objModel.DateCreated}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
                        }
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Tên khách hàng</Text>
                        <TextInput autoCapitalize='words' placeholder='Tên khách hàng' onChangeText={value => this.setCusName(value)}
                            value={objModel.Customer_Name} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Số điện thoại</Text>
                        <TextInput keyboardType='phone-pad' placeholder='Số điện thoại khách hàng' onChangeText={value => this.setCusPhone(value)}
                            value={objModel.Customer_Phone} />
                    </View>
                </View>

                <View style={[styles.frmInput, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lblInput}>Nhân viên</Text>
                        <Picker style={{ flex: 1 }} selectedValue={objModel.EmployerId}
                            onValueChange={(itemValue, itemIndex) => this.setEmployerId(itemValue, itemIndex)} >
                            {this.renderEmployerItems(lstEmployer)}
                        </Picker>
                    </View>
                </View>

                <Button
                    buttonStyle={{ minWidth: 100, marginTop: 10 }}
                    title="Lưu"
                />
            </KeyboardAwareScrollView>

        )
    }
}