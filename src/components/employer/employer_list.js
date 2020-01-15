import * as React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBar.currentHeight;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
    background: require('../../../assets/imgs/topbanerpra.jpg'), // Put your own image here
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default class EmployerScreen extends React.Component {

    renderNavBar = () => (
        <View style={styles.navContainer}>
            <View style={styles.statusBar} />
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.iconLeft} onPress={() => { }}>
                    <Icon name="add" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconRight} onPress={() => { }}>
                    <Icon name="search" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )

    renderContent = () => (
        <ScrollView>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
            <Text>8</Text>
        </ScrollView>
    )
    render() {
        return (
            <View style={styles.container}>
                <ReactNativeParallaxHeader
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={250}
                    extraScrollHeight={20}
                    navbarColor="#3498db"
                    title="Parallax Header"
                    titleStyle={styles.titleStyle}
                    backgroundImage={images.background}
                    backgroundImageScale={1.2}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container}
                    scrollViewProps={{
                        onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
                        onScrollEndDrag: () => console.log('onScrollEndDrag'),
                    }}
                />
            </View>
        );
    }
}