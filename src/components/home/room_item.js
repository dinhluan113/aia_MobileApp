import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

export default class RoomItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.item}>
                <Ionicons name='ios-home' size={25} />
                <Text>{this.props.item.roomName}</Text>
            </TouchableOpacity>
        );
    }
}

const itemWidth = Dimensions.get('window').width / 2 - 35;

const styles = StyleSheet.create({
    item: {
        width: itemWidth,
        height: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#e1e1e1',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    }
});