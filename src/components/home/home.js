import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, FlatList } from 'react-native';

import RoomItem from './room_item.js';

export default class HomeScreen extends React.Component {
    state = {
        lstTmp: [
            {
                "id": "1",
                "roomName": "P101"
            },
            {
                "id": "2",
                "roomName": "P102"
            },
            {
                "id": "3",
                "roomName": "103"
            },
        ]
    };
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.lstTmp}
                    renderItem={({ item }) => <RoomItem item={item} />}
                    keyExtractor={item => item.id}
                    numColumns={2}                  // set number of columns 
                    columnWrapperStyle={styles.row}  // space them out evenly
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    }
});