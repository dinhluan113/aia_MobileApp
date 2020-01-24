import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, FlatList } from 'react-native';
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


function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default class ContractItem extends React.Component {
    constructor(props) {
        super(props);
    }

    viewContractDetail = id => {
        this.props.viewContractDetail(id);
    }

    onRefresh = () => {
        this.props.onRefresh();
    };

    render() {
        return (
            <FlatList
                data={this.props.lstItems}
                onRefresh={this.onRefresh}
                refreshing={this.props.isRefreshing}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.boxActivity} activeOpacity={.5} onPress={() => { this.viewContractDetail(item.id) }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ flex: 1 }}>{item.contractId}</Text>
                                <Text style={{ flex: 1, textAlign: 'right', color: '#8f94a2', fontSize: 12 }}>{item.dateCreated}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Khách hàng</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.customer_Name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', paddingRight: 5 }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>Nhân viên</Text>
                                    <Text style={{ color: '#333', fontSize: 13 }}>{item.userName}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
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
                }
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}