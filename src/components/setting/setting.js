import * as React from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ListImages from '../../../assets/images.js';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('users');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    topHeader: {
        paddingTop: StatusBar.currentHeight + 20,
        minHeight: 195,
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

const mapStateToProps = state => ({
    getJWTToken: state.getJWTToken,
});

let JWT_TOKEN = '';
let _IS_MOUNTED = false;
class SettingScreen extends React.Component {

    constructor(props) {
        super(props);
        JWT_TOKEN = this.props.getJWTToken;
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('userid');
            if (value !== null) {
                return value;
            }
        } catch (error) {
        }
    };

    componentDidMount = () => {
        this._IS_MOUNTED = true;
        let _this = this;
        let propmisData = this._retrieveData();
        propmisData.then(value => {
            UserRepository.get(value, JWT_TOKEN)
                .then((response) => {
                    let model = response.data;
                    this.setObject(model);
                })
                .catch(function (e) {
                    alert("Không thể tải thông tin. Vui lòng thử lại sau.");
                })
                .finally(function () {
                });
        })
    }

    componentWillUnmount() {
        this._IS_MOUNTED = false;
    }

    state = {
        objModel: {
            "userName": "",
            "dateCreated": "",
            "expirationDate": "",
            "totalEmployer": 0,
            "totalContracts": 0,
            "avatar": ""
        },
    }

    setObject = (obj) => {
        if (this._IS_MOUNTED) {
            this.setState(Object.assign(
                this.state.objModel, {
                "userName": obj.userName,
                "dateCreated": obj.dateCreated,
                "expirationDate": obj.expirationDate,
                "totalEmployer": obj.totalEmployer,
                "totalContracts": obj.totalContracts,
                "avatar": ""
            }));
        }
    }

    handleLogout = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc muốn đăng xuất không?',
            [
                {
                    text: 'Không', style: 'cancel'
                },
                {
                    text: 'Có', onPress: () => this.props.doLogout()
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        let { objModel } = this.state;
        return (
            <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: '#f0f9ff' }}>
                <LinearGradient colors={['#04c1b3', '#1f709e']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topHeader}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#fff', borderRadius: 110 / 2 }}>
                            <Image source={ListImages.UserDefaultAvatar} style={{ width: 110, height: 110, borderRadius: 110 / 2 }} />
                        </View>
                        <Text style={{ marginTop: 10, marginBottom: 5, color: '#fff', textTransform: 'lowercase' }}>{objModel.userName}</Text>
                    </View>
                </LinearGradient>

                <View style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={{ fontWeight: '700', marginBottom: 5, fontSize: 17 }}>Thông tin tài khoản</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 1, color: '#3C4043' }}>Ngày đăng ký: </Text>
                        <Text style={{ flex: 1, color: '#3C4043', textAlign: 'right' }}>{objModel.dateCreated}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={{ flex: 1, color: '#3C4043' }}>Ngày hết hạn: </Text>
                        <Text style={{ flex: 1, color: '#3C4043', textAlign: 'right' }}>{objModel.expirationDate}</Text>
                    </View>

                    <TouchableOpacity onPress={this.handleLogout} style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center', borderColor: 'green', borderWidth: 1, padding: 10, borderRadius: 50 }} >
                        <Text>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, actions)(SettingScreen);