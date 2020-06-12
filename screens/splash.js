import React, { Component } from 'react';
import { StyleSheet, Text, Button, Image, View, LayoutAnimation } from 'react-native';


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
                    <Image style={styles.img}
                        source={require('../assets/logo.png')}
                        resizeMode={"contain"} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Image style={styles.img}
                        source={require('../assets/logo.png')}
                        resizeMode={"contain"} />
                    <Button title="go."
                        onPress={() => this.props.navigation.navigate('Home')}>

                    </Button>

                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        flex: 1
    },
    img: {
        width: "40%",
        height: "40%",
    },
    btn: {
        display: "none"
    }
});


