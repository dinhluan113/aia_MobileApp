import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NumberFormat from 'react-number-format';

const styles = StyleSheet.create({
    boxActivity: {
        flex: 1, justifyContent: 'center', backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        flexDirection: 'row',
        borderLeftColor: '#012456',
        borderLeftWidth: 2, 
    },
});

export default class ContractItem extends React.Component {
    constructor(props) {
        super(props);
    }

    renderItems() {
        if (this.props.lstItems != null) {
            return this.props.lstItems.map((item) => {
                return (
                    <TouchableOpacity style={styles.boxActivity} activeOpacity={.5} key={item.Id}>
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text>{item.customer_Name}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Ngày tạo</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.dateCreated}</Text>
                                </View>
                                <View style={{ flex: 2, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Nhân viên</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.userName}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', minWidth: 19 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12, textAlign: 'right' }}>NFYP</Text>
                                    <NumberFormat
                                        value={item.nfyp}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'₫'}
                                        renderText={value => <Text numberOfLines={1} style={{ textAlign: 'right' }}>{value}</Text>}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
        }
    }

    render() {
        return (
            <View>
                {
                    this.renderItems()
                }
            </View>
        )
    }
}