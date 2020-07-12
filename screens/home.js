import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, View, KeyboardAvoidingView, LayoutAnimation, ActivityIndicator, StatusBar } from 'react-native';
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from '../database/firebase_config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeoutDone: false,
            form: "signIn",
            email: "",
            password: "",
            confirmPassword: "",
            incorrectPassword: " ",
            isLoading: false
        };
    };

    signOut() {
        Firebase.auth().signOut().then(() => {
            console.log("here")
            this.props.navigation.navigate("Splash")
        }).catch((error) => {
            console.log(error)
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.signOut()}
                    style={styles.signOutBtn}>
                    <Text style={styles.signOutTxt}>Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
    },
    signOutBtn: {
        backgroundColor: '#0E6BA8',
        borderRadius: 20,
        alignSelf: "center",
    },
    activityIndicator: {
        alignSelf: "center",
        height: 40,
    },
    signOutTxt: {
        fontSize: 20,
        fontFamily: 'Gill Sans',
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    incorrect: {
        padding: 20,
        color: "grey"
    }
});