import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image, View, KeyboardAvoidingView, LayoutAnimation } from 'react-native';
import { Input } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from '../database/firebase_config';

export default class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeoutDone: false,
            form: "signIn",
            email: "",
            password: "",
            confirmPassword: "",
            incorrectPassword: " "
        };
    };


    componentDidMount() {

    }

    switchFunc() {
        LayoutAnimation.spring()
        if (this.state.form === "signIn") {
            this.setState({ form: "signUp" })
            this.setState({ incorrectPassword: " " })
        }
        else {
            this.setState({ form: "signIn" })
            this.setState({ incorrectPassword: " " })
        }
        console.log(this.state.form)
    }

    emailChanged(email) {
        this.setState({ email })
    }

    passwordChanged(password) {
        this.setState({ password })
    }

    confirmPasswordChanged(confirmPassword) {
        this.setState({ confirmPassword })
    }

    signInClicked() {
        var that = this;
        if (this.state.email === "") {
            this.setState({ incorrectPassword: "Email is empty." })
        }
        else if (this.state.password.length < 8) {
            this.setState({ incorrectPassword: "Password must be longer than 8 characters." })
        }
        else {
            signInPromise = new Promise((resolve, reject) => {
                Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                    console.log(error.code)
                    switch (error.code) {
                        case "auth/invalid-email":
                            that.setState({ incorrectPassword: "Enter a correct email address." })
                            break;
                        case "auth/user-not-found":
                            that.setState({ incorrectPassword: "There is no user with that email address." })
                            break;
                        case "auth/wrong-password":
                            that.setState({ incorrectPassword: "Incorrect password." })
                            break;

                        default:
                            that.setState({ incorrectPassword: "Something went wrong. Please try again." })
                            break;
                    }
                });
                resolve()
            })

            signInPromise.then(() => {
                let user = Firebase.auth().currentUser
                Alert.alert(
                    "Signed in!",
                    "You've been signed in as user " + user.email,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                );
            }, notSignedIn => {
                Alert.alert(
                    "Uh-oh!",
                    "You haven't been signed in",
                    [
                        {
                            text: "Please try again.",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "Go back"
                        }
                    ],
                    { cancelable: false }
                );
            }).catch(error => {
                console.log("There was an error : " + error)
            })
        }

    }

    signUpClicked() {

        var that = this;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!this.state.email) {
            this.setState({ incorrectPassword: "Empty e-mail field." })
        }
        else if (!re.test(String(this.state.email).toLowerCase())) {
            this.setState({ incorrectPassword: "Enter a valid email address." })
        }
        else if (this.state.password.length < 8 && this.state.confirmPassword.length) {
            this.setState({ incorrectPassword: "Password must be longer than 8 characters." })
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ incorrectPassword: "Passwords do not match." })
        }
        else {
            Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                console.log(error.code)
                if (error.code === "auth/email-already-in-use") {
                    that.setState({ incorrectPassword: "An account with that email already exists." })
                }
                else {
                    that.setState({ incorrectPassword: "Something went wrong." })
                }
            });
        }


    }

    render() {
        if (this.state.form === "signIn") {
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
                                    leftIcon={{
                                        type: 'simple-line-icon',
                                        name: 'user',
                                        size: 20,
                                        iconStyle: { marginHorizontal: 5 },
                                        color: "grey"
                                    }}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    style={styles.iconStyling}
                                    onChangeText={email => this.emailChanged(email)}
                                    onSubmitEditing={() => { this.password.focus(); }}>
                                </Input>
                                <Input
                                    leftIcon={{
                                        type: 'simple-line-icon',
                                        name: 'key',
                                        iconStyle: { marginHorizontal: 5 },
                                        size: 20,
                                        color: "grey"
                                    }}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={password => this.passwordChanged(password)}
                                    ref={(input) => { this.password = input; }}
                                    placeholder="Password">
                                </Input>
                                <Text style={styles.incorrect}>
                                    {this.state.incorrectPassword}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.signInBtn}
                                onPress={() => this.signInClicked()}>
                                <Text style={styles.signInTxt}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpContainer}>
                            <Text style={styles.minorStyling}>Not part of the track family?</Text>
                            <TouchableOpacity
                                onPress={() => this.switchFunc()}>
                                <Text style={styles.btnStyling}>
                                    Sign Up
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback >
            )
        }
        else {
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
                                    leftIcon={{
                                        type: 'simple-line-icon',
                                        name: 'user',
                                        size: 20,
                                        iconStyle: { marginHorizontal: 5 },
                                        color: "grey"
                                    }}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    style={styles.iconStyling}
                                    onChangeText={email => this.emailChanged(email)}
                                    onSubmitEditing={() => { this.password.focus(); }}>
                                </Input>
                                <Input
                                    leftIcon={{
                                        type: 'simple-line-icon',
                                        name: 'key',
                                        iconStyle: { marginHorizontal: 5 },
                                        size: 20,
                                        color: "grey"
                                    }}
                                    ref={(input) => { this.password = input; }}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={password => this.passwordChanged(password)}
                                    onSubmitEditing={() => { this.confirmPassword.focus(); }}
                                    placeholder="Password">
                                </Input>
                                <Input
                                    leftIcon={{
                                        type: 'simple-line-icon',
                                        name: 'key',
                                        iconStyle: { marginHorizontal: 5 },
                                        size: 20,
                                        color: "grey"
                                    }}
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    onChangeText={confirmPassword => this.confirmPasswordChanged(confirmPassword)}
                                    ref={(input) => { this.confirmPassword = input; }}
                                    placeholder="Confirm Password">
                                </Input>
                                <Text style={styles.incorrect}>
                                    {this.state.incorrectPassword}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.signInBtn}
                                onPress={() => this.signUpClicked()}>
                                <Text style={styles.signInTxt}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signUpContainer}>
                            <Text style={styles.minorStyling}>Already signed up?</Text>
                            <TouchableOpacity
                                onPress={() => this.switchFunc()}>
                                <Text style={styles.btnStyling}>
                                    Sign In
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback >
            )
        }
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
        fontSize: 16,
        fontFamily: 'Gill Sans',
    },
    btnStyling: {
        fontSize: 16,
        color: "blue",
        fontFamily: 'Gill Sans',
    },
    img: {
        width: "40%",
        height: "40%",
        alignSelf: "center",
        flex: 0.5
    },
    signInBtn: {
        backgroundColor: '#0E6BA8',
        borderRadius: 20,
        alignSelf: "center",
    },
    signInTxt: {
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


