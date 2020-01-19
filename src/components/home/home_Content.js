import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image, Dimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import ContractItems from '../contracts/contract_items';
import StyleGlobal from '../../../assets/stylesGlobal.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const lstItems = [{
    Id: 1,
    customer_Name: "Blue",
    dateCreated: "2020-01-15",
    userName: "ABC",
    nfyp: 15000000
}, {
    Id: 2,
    customer_Name: "Red",
    dateCreated: "2020-01-10",
    userName: "XYZ",
    nfyp: 19000000
}];

export default class HomeContent extends React.Component {


    render() {
        return (
            <View style={{ backgroundColor: '#f0f9ff' }}>
                <View style={{ padding: 20, flex: 1, flexDirection: 'column', paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.boxDetail, StyleGlobal.boxShadowSoft, { marginRight: 10 }]} activeOpacity={.5} onPress={this.show}>
                            <Text style={{ color: '#8f94a2', fontSize: 12 }}>FYP</Text>
                            <Text style={{ color: '#333', fontSize: 17 }}>100.000.000 đ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boxDetail, StyleGlobal.boxShadowSoft, { marginLeft: 10 }]} activeOpacity={.5} onPress={this.show}>
                            <Text style={{ color: '#8f94a2', fontSize: 12 }}>Need to do</Text>
                            <Text style={{ color: '#333', fontSize: 17 }}>50.000.000 đ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 20, flex: 1, flexDirection: 'column', minHeight: SCREEN_HEIGHT - 120 }}>
                    <Text style={styles.txtTitle}>Recent Activity</Text>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <ContractItems lstItems={lstItems} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxDetail: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', height: 100,
        borderRadius: 10
    },
    txtTitle: {
        color: '#333',
        fontWeight: '700',
        fontSize: 17,
    },
    TextStyle: {
        color: '#333',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '800',
    },
});