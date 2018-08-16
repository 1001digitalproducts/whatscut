import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
    Card, CardItem, Body, Text, Textarea, Button, Form, Label
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

    render() {
        return (
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
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        alignSelf: 'center',
        margin: 10,
        color: '#D93D3C'
    },
    cardStyle: {
        borderRadius: 8,
        width: (width) - 20,
        backgroundColor: '#D93D3C',
        borderColor: '#D93D3C',
    },
    formStyle: {
        alignSelf: 'center',
        width: '90%',
        marginBottom: 5
    },
    formNumber: {
        alignSelf: 'center',
        width: '90%',
    }
});
