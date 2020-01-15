import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Image, Dimensions } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

import HomeNavbar from './home_Navbar';
import HomeContent from './home_Content';
import HomeBoxDateCommit from './home_BoxDateCommit';
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default class HomeScreen extends React.Component {
    renderNavBar = () => (
        <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: SCREEN_WIDTH, height: 105 }}>
            <HomeBoxDateCommit />
        </LinearGradient>
    )

    renderContent = () => (
        <HomeContent />
    )
    render() {
        return (
            <View style={styles.container}>
                <ReactNativeParallaxHeader
                    headerMinHeight={105}
                    headerMaxHeight={250}
                    extraScrollHeight={0}
                    title={<HomeNavbar />}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    alwaysShowTitle={false}
                    alwaysShowNavBar={false}
                    scrollViewProps={{
                        onScrollBeginDrag: () => { },
                        onScrollEndDrag: () => { },
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f9ff',
        flex: 1
    },
});