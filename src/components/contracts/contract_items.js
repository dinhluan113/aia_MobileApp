import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const styles = StyleSheet.create({
    boxActivity: {
        flex: 1, justifyContent: 'center', backgroundColor: '#fff', height: 70,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        maxHeight: 75,
        flexDirection: 'row'
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
                        <View style={{ flex: 1, maxWidth: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="dvr" size={35} color="#333" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text>{item.customer_Name}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>{item.dateCreated}</Text>
                                    <Text style={{ color: '#333', fontSize: 17 }}>{item.dateCreated}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>{item.userName}</Text>
                                    <Text style={{ color: '#333', fontSize: 17 }}>{item.userName}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: '#8f94a2', fontSize: 12 }}>{item.nfyp}</Text>
                                    <Text style={{ color: '#333', fontSize: 17 }}>{item.nfyp}</Text>
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