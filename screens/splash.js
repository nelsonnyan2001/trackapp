import React, { Component } from 'react';
import { StyleSheet, Text, Button, Image, View, LayoutAnimation } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeoutDone: false,
        };
    };

    componentDidMount() {
        setTimeout(() => {
            LayoutAnimation.spring()
            this.setState({ timeoutDone: "true" })
        }, 2000);
    }

    handleButtonPress() {
        this.props.navigation.navigate("Home")
    }

    render() {
        if (!this.state.timeoutDone) {
            return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.img}
                            source={require('../assets/logo.png')}
                            resizeMode={"contain"} />
                        <Text style = {styles.smalltext}> 
                            a pet project
                        </Text>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.img}
                            source={require('../assets/logo.png')}
                            resizeMode={"contain"} />
                        <Text style={styles.smalltext}>
                            by @nelly_skrt
                        </Text>
                    </View>
                    <View style = {styles.btn}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
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


