import React, { Component } from 'react';
import { StyleSheet, Text, StatusBar, Image, View, LayoutAnimation } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Firebase from '../database/firebase_config';
import { NavigationEvents } from 'react-navigation';

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            timeoutDone: false,
        };
    };

    componentDidMount() {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("Logged in")
                var user = Firebase.auth().currentUser;
                this.setState({ user })
            }
            else {
                console.log("Not logged in")
                this.setState({ user: {} })
            }
        })
        setTimeout(() => {
            LayoutAnimation.spring()
            this.setState({ timeoutDone: "true" })
        }, 1000);
    }

    handleButtonPress() {

        if (Object.keys(this.state.user).length == 0) {
            this.props.navigation.navigate("Authentication")
        }
        else {
            this.props.navigation.navigate("Home")
        }
    }

    render() {
        <NavigationEvents onDidFocus={() => {
            Firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log("Logged in")
                }
                else {
                    console.log("Not logged in")
                }
            })
        }} />
        if (!this.state.timeoutDone) {
            return (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <View style={styles.topContainer}>
                        <Image style={styles.img}
                            source={require('../assets/logo.png')}
                            resizeMode={"contain"} />
                        <Text style={styles.smalltext}>
                            a pet project
                        </Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <View style={styles.topContainer}>
                        <Image style={styles.img}
                            source={require('../assets/logo.png')}
                            resizeMode={"contain"} />
                        <Text style={styles.smalltext}>
                            by @nelly_skrt
                        </Text>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity
                            onPress={() => this.handleButtonPress()}>
                            <Text style={styles.btnText}>
                                go.
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 1
    },
    img: {
        width: "40%",
        height: "40%",
    },
    btn: {
        display: "none"
    },
    topContainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    smalltext: {
        fontFamily: 'Gill Sans',
    },
    btnText: {
        fontFamily: 'Gill Sans',
        fontSize: 18,
        color: "blue"
    },
    btn: {
        justifyContent: "center",
        alignItems: "center"

    }
});


