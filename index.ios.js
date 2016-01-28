/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  DeviceEventEmitter,
  Text,
  View
} from 'react-native';

import Beacons from 'react-native-ibeacon';

Beacons.requestAlwaysAuthorization();

let region = {
  identifier: 'Estimotes',
  uuid: 'e2c56db5dffb48d2b060d0f5a71096e0'
};

// DeviceEventEmitter.addListener(
//   'beaconsDidRange',
//   (data) => {
//     console.log('this is the data', data);
//   }
// )
Beacons.startMonitoringForRegion(region);
// Beacons.startRangingBeaconsInRegion(region);
 
Beacons.startUpdatingLocation();

// proximity comes back as "far", "near", "immediate" or "unknown". 
// We can have a function to open lock when state = "near"

class beaconTest2 extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentDidMount() {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          proximity: data.region.proximity,
          distance: data.region.accuracy,
          uuid: data.region.uuid
        });
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          UUID: {this.state.uuid + '\n\n'}
          The beacon is {this.state.proximity + '\n\n'}
          Distance of beacon is {this.state.distance + '\n\n'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('beaconTest2', () => beaconTest2);