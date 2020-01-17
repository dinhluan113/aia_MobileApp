import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Image } from 'react-native';
import NumberFormat from 'react-number-format';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import ListImages from '../../../assets/images.js';
import StyleGlobal from '../../../assets/stylesGlobal.js';

const avatarWidth = 50;
const styles = StyleSheet.create({
    boxActivity: {
        backgroundColor: '#fff',
        height: 70,
        borderRadius: 10,
        margin: 10,
        marginBottom: 5,
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

export default class EmployertItem extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAvatar = (item) => {
        if (typeof item.avatar != "undefined" && item.avatar != '') {
            return <Image source={item.avatar} style={{ width: 43, height: 43, borderRadius: 110 / 2 }} />
        }
        else {
            return <Image source={ListImages.EmployerDefaltAvatar} style={{ width: 43, height: 43, borderRadius: 110 / 2 }} />
        }
    }

    renderItems() {
        if (this.props.lstItems != null) {
            return this.props.lstItems.map((item) => {
                return (
                    <TouchableOpacity style={[styles.boxActivity, StyleGlobal.boxShadowSoft]} activeOpacity={.5} key={item.Id}>
                        <View style={{ flex: 1, paddingLeft: avatarWidth / 2 }}>
                            <View style={[styles.boxAvatar, StyleGlobal.boxShadowHeavy]}>
                                {this.renderAvatar(item)}
                            </View>
                            <View>
                                <Text>{item.customer_Name}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ color: '#999', marginTop: 5 }}>{item.customer_Phone}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#dddddd', paddingLeft: 20, paddingRight: 20 }}>
                            <Ionicons name={'ios-paper'} size={25} color='#777'  />
                        </TouchableOpacity>
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