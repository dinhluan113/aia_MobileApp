import * as React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListImages from '../../../assets/images.js';

import HomeBoxDateCommit from './home_BoxDateCommit';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class HomeNavbar extends React.Component {
    onChangeDate = (month, year) => {
        this.props.onChangeDate(month, year);
    }

    render() {
        return (
            <View style={{ width: SCREEN_WIDTH, backgroundColor: '#f0f9ff' }}>
                <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topHeader}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 110 / 2 }}>
                            <Image source={ListImages.UserDefaultAvatar} style={{ width: 110, height: 110, borderRadius: 110 / 2 }} />
                        </View>
                        <Text style={{ marginTop: 10, marginBottom: 55, color: '#fff' }}>User Name</Text>
                    </View>
                </LinearGradient>

                <HomeBoxDateCommit crrCommit={this.props.crrCommit} onChangeDate={this.onChangeDate} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topHeader: {
        paddingTop: StatusBar.currentHeight + 20,
        minHeight: 200,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        marginBottom: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        position: 'relative'
    }
});