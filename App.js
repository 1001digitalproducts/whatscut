import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {
    Card, CardItem, Body, Text, Textarea, Form, Label, Icon
} from 'native-base';
import PhoneInput from 'react-native-phone-input'
import ModalPickerImage from './ModalPickerImage';
import SplashScreen from 'react-native-splash-screen';

const {width} = Dimensions.get('window');
export default class App extends Component {

    componentDidMount() {
        this.setState({
            pickerData: this.phone.getPickerData()
        });
        SplashScreen.hide();
    }

    onPressFlag() {
        this.myCountryPicker.open()
    }

    selectCountry(country) {
        this.phone.selectCountry(country.iso2)
    }

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            pickerData: null,
            notelp: ''
        }
    }

    changePhoneNumber = (notelp) => {
        this.setState({
            notelp
        })
    };

    changeMessage = (message) => {
        this.setState({
            message
        })
    };

    sendMessage = () => {
        console.log('send message!');
    };

    openMenu = () => {
        console.log('open menu!');
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.openMenu}>
                        <Icon style={{color: '#338a3e'}} name='dots-vertical' type={`MaterialCommunityIcons`}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Whats Cut!</Text>
                    <Card style={styles.cardStyle}>
                        <CardItem style={styles.cardStyle}>
                            <Body>
                            <View style={styles.formNumber}>
                                <PhoneInput
                                    initialCountry={`id`}
                                    ref={(ref) => {
                                        this.phone = ref;
                                    }}
                                    onPressFlag={this.onPressFlag}
                                    onChangePhoneNumber={this.changePhoneNumber}
                                    value={this.state.notelp}
                                />
                            </View>
                            <Form
                                style={styles.formStyle}>
                                <Label style={{color: '#fff'}}>Alamat</Label>
                                <Textarea
                                    rowSpan={5}
                                    value={this.state.message}
                                    onChangeText={this.changeMessage}
                                    placeholder="Isi pesan"
                                />
                            </Form>
                            <TouchableOpacity
                                onPress={() => this.sendMessage}
                                style={styles.viewButtonStyle}>
                                <View style={styles.buttonStyle}>
                                    <Icon style={{color: '#e8f5e9'}} name='send' type={`MaterialIcons`}/>
                                </View>
                            </TouchableOpacity>
                            </Body>
                        </CardItem>
                    </Card>

                    <ModalPickerImage
                        ref={(ref) => {
                            this.myCountryPicker = ref;
                        }}
                        data={this.state.pickerData}
                        onChange={(country) => {
                            this.selectCountry(country)
                        }}
                        cancelText='Cancel'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        backgroundColor: '#E1E2E1',
        flexDirection: 'row-reverse',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E1E2E1',
    },
    welcome: {
        fontSize: 20,
        alignSelf: 'center',
        margin: 10,
        color: '#338a3e'
    },
    cardStyle: {
        borderRadius: 8,
        width: (width) - 20,
        backgroundColor: '#338a3e',
        borderColor: '#338a3e',
    },
    formStyle: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: 5,
        backgroundColor: '#66bb6a',
        borderRadius: 4,
        margin: 6,
        padding: 5
    },
    formNumber: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: 5,
        marginTop: 10,
        backgroundColor: '#66bb6a',
        borderRadius: 4,
        height: 30,
        padding: 5,
    },
    buttonStyle: {
        backgroundColor: '#66bb6a',
        borderRadius: 50,
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButtonStyle: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '90%',
        padding: 1
    }
});
