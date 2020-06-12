import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, View, KeyboardAvoidingView } from 'react-native';
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class home extends Component {

    componentDidMount() {

    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView style={styles.container}
                    behavior="padding">
                    <View style={styles.topContainer}>
                        <Image style={styles.img}
                            source={require('../assets/logo.png')}
                            resizeMode={"contain"} />
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="Email"
                                onSubmitEditing={() => { this.password.focus(); }}>
                            </Input>
                            <Input
                                ref={(input) => { this.password = input; }}
                                placeholder="Password">
                            </Input>
                        </View>
                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.minorStyling}>Not part of the track family?</Text>
                        <TouchableOpacity>
                            <Text style={styles.btnStyling}>
                                Sign Up
                        </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
    },
    topContainer: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 0.8
    },
    inputContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    signUpContainer: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 0.2,
    },
    minorStyling: {
        fontSize: 14
    },
    btnStyling: {
        fontSize: 14,
        color: "blue"
    },
    img: {
        width: "40%",
        height: "40%",
        alignSelf: "center"
    },

});


