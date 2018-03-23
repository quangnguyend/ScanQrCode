import React, { Component } from 'react';
import {
  View,
  Vibration,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
import Header from './header';

import Service from '../../../services/api';
import { connect } from 'react-redux';


class ScanReceipt extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `SCAN RECEIPT`,
    header: (props) => <Header {...props} />
  })

  constructor(props) {
    super(props)

    this.state = {
      scanSuccessfull: false
    }
  }

  componentWillUnmount() {
    console.log('Scan Unmount')
  }

  //**QR CODE */
  navigate = (screen, data) => {
    this.props.navigate(screen, data)
  }

  //call api so get Info
  getReceipt = async (body) => {
    const fetchInfo = await Service.postMethod('scan', body,
      data => {
        console.log(data)
        if (data.status === 400) {
          this.navigate('InvalidPage', data)
        } else {
          this.navigate('ComfirmCollection', data)
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  //**END QR CODE */

  // Has scan result
  onScanner = (e) => {
    if (!this.state.scanSuccessfull) {
      Vibration.vibrate();
      this.setState({
        scanSuccessfull: true
      })
      // if user choose ENTRY

      let body = {
        "code": e.data,
        "action": "purchaseInfo",
      }

      this.getReceipt(body)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/qr-codescreen.png')}
          style={styles.imageBackground}
          resizeMode={'stretch'}
        />
        <Camera
          style={styles.camera}
          onBarCodeRead={this.onScanner}
          type={"back"}
        />
      </View>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  navigate: (routeName, params) => dispatch({ type: 'navigate', ...{ routeName: routeName, params: params } })
});

export default connect(null, mapDispatchToProp)(ScanReceipt);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageBackground: {
    width: 250,
    height: 250,
    zIndex: 1
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});