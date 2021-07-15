// Design Specifications
// ● Vertical and horizontal spacing: evenly distributed
// ● App title: font size 45, font weight 600, font color #FFFFFF

// ● “Your name”: font size 16, font weight 300, font color #757083, 50% opacity
// ● “Choose background color”: font size 16, font weight 300, font color #757083, 100% opacity
// ● Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
// ● Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

import React from 'react';

import { View, Text, Button,TextInput,StyleSheet,ImageBackground,TouchableOpacity } from 'react-native';

// const image = require('../assets/Background Image.png');

export default class Start extends React.Component {
  constructor(props) {
       super(props);
       this.state = { name: '' ,
       backgroundColor: '#757083'
      };
       }


       
  render() {
    let { backgroundColor } = this.state;
    return (
      <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/Background-Image.png')}
      >
        <View style={styles.main}>
          <Text style={styles.title}>Welcome</Text>
        </View>
        <View style={styles.chatOptions}>
          <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Type your name'
          />
          <View style={styles.box}>
            <Text
              style={styles.backgroundColorText}>
              Choose Background Color:
            </Text>
            <View style={styles.backgroundColor}>
              <TouchableOpacity
                style={styles.backgroundColor1}
                onPress={() => this.setState({ backgroundColor: '#090C08' })}
              />
              <TouchableOpacity
                style={styles.backgroundColor2}
                onPress={() => this.setState({ backgroundColor: '#474056' })}
              />
              <TouchableOpacity
                style={styles.backgroundColor3}
                onPress={() => this.setState({backgroundColor: '#8A95A5' })}
              />
              <TouchableOpacity
                style={styles.backgroundColor4}
                onPress={() => this.setState({backgroundColor: '#B9C6AE' })}
              />
            </View>
          </View>
          <TouchableOpacity>
          <Button  style={{ backgroundColor: backgroundColor, height: 60, }}
              title="Press to chat"
             onPress={() => this.props.navigation.navigate('Chat',{name:this.state.name,backgroundColor: this.state.backgroundColor})}
              />
            {/* <Text style={styles.startText}>Start Chatting</Text> */}
            </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      flexDirection: 'column'
    },
    title: {
      fontSize: 45,
      fontWeight: '600',
      color: '#FFFFFF',
      textAlign: 'center',
      height: 60,
    },
    main: {
      flex: 0.40,
      height:100
    },
    chatOptions: {
      flex: 0.45,
      backgroundColor: 'white',
      width: '80%',
      paddingLeft: '5%',
      paddingRight: '5%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      borderRadius: 5,
    },
    input: {
      height: 60,
      borderColor: 'gray',
      borderWidth: 1,
      borderColor: '#757083',
      borderRadius: 5,
      fontSize: 16,
      fontWeight: "300",
      color: '#757083',
      paddingLeft: '3%',
    },
    backgroundColorText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#757083',
      marginBottom: 10,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      flex: 1,
      resizeMode: "cover",
      justifyContent: 'center',
      alignItems: 'center'
    },
    startButton: {
      backgroundColor: '#757083',
      height: 60,
    },
    
    box: {
      flexDirection: 'column'
    },
    backgroundColor: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 60,
    },
    backgroundColor1: {
      backgroundColor: '#090C08',
      width: 60,
      borderRadius: 30,
    },
    backgroundColor2: {
      backgroundColor: '#474056',
      width: 60,
      borderRadius: 30,
    },
    backgroundColor3: {
      backgroundColor: '#8A95A5',
      width: 60,
      borderRadius: 30,
    },
    backgroundColor4: {
      backgroundColor: '#B9C6AE',
      width: 60,
      borderRadius: 30,
    },
  
  });
  





