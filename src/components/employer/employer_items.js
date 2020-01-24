import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, FlatList, Image, Linking } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'; // 6.2.2
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';

const avatarWidth = 50;
const styles = StyleSheet.create({
    boxActivity: {
        backgroundColor: '#fff',
        height: 70,
        borderRadius: 10,
        margin: 10,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: avatarWidth / 2 + 10,
        padding: 10,
        borderLeftColor: '#012456',
        borderLeftWidth: 2,
    },
    boxAvatar: {
        position: 'absolute',
        left: -(avatarWidth / 2 + 10),
        width: avatarWidth,
        height: avatarWidth,
        backgroundColor: '#fff',
        borderRadius: avatarWidth / 2,
        justifyContent: 'center',
        alignItems: 'center',
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

    viewDetail = id => {
        this.props.viewDetail(id);
    }

    onRefresh = () => {
        this.props.onRefresh();
    };

    renderAvatar = (item) => {
        if (typeof item.avatar != "undefined" && item.avatar != '') {
            return <Image source={item.avatar} style={{ width: 43, height: 43, borderRadius: 110 / 2 }} />
        }
        else {
            return <Image source={ListImages.EmployerDefaltAvatar} style={{ width: 43, height: 43, borderRadius: 110 / 2 }} />
        }
    }

    render() {
        return (
            <FlatList
                data={this.props.lstItems}
                onRefresh={this.onRefresh}
                refreshing={this.props.isRefreshing}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.boxActivity, StyleGlobal.boxShadowSoft]} activeOpacity={.5} onPress={() => { this.viewDetail(item.id) }}>
                        <View style={{ flex: 1, paddingLeft: avatarWidth / 2 }}>
                            <View style={[styles.boxAvatar, StyleGlobal.boxShadowHeavy]}>
                                {this.renderAvatar(item)}
                            </View>
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ color: '#999', marginTop: 5 }}>{item.phone}</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => { Linking.openURL(`tel:${item.phone}`) }}
                            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#dddddd', paddingLeft: 20, paddingRight: 20 }}>
                            <SimpleLineIcons name={'call-in'} size={25} color='#777' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}