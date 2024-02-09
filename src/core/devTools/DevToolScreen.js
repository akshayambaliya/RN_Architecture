import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import NetworkLoggerScreen from './networkLogger/networkLogger';
import OverlayButton from './OverlayButton';
import ResponsiveStyleSheet from '../../lib/ResponsiveStyleSheet';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FeatureToggleScreen from '../featureToggles/FeatureToggleScreen';
import { processLocalToggles } from '../featureToggles/featureToggleActions';
import { connect } from 'react-redux';
import ReduxLogger from './ReduxLogger';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <NavigationContainer independent={true} >
      <Tab.Navigator>
        <Tab.Screen name="Network Log" component={NetworkLoggerScreen} options={{ headerShown: false, tabBarIconStyle: { display: 'none' } }} />
        <Tab.Screen name="Feature Toggle" component={FeatureToggleScreen} options={{ headerShown: false, tabBarIconStyle: { display: 'none' } }} />
        <Tab.Screen name="Redux Logger" component={ReduxLogger} options={{ headerShown: false, tabBarIconStyle: { display: 'none' } }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

class DevToolScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowOverlay: false,
    };
  }

  componentDidMount() {
    this.props.localFeatureToggle()
  }

  render() {
    return (
      <>
        {this.state.shouldShowOverlay && (
          <View style={styles.fullScreen}>
            <TabNavigator />
            <TouchableOpacity
              style={{ padding: 20, backgroundColor: 'orange', paddingHorizontal: 40 }}
              onPress={() => this.setState({ shouldShowOverlay: false })}
            ><Text style={{ fontSize: 18 }}>Return to App</Text></TouchableOpacity>
          </View>
        )}
        <OverlayButton
          onPress={() => this.setState({ shouldShowOverlay: true })}
          status={this.state.shouldShowOverlay}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  localFeatureToggle: () => dispatch(processLocalToggles()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevToolScreen);

const styles = ResponsiveStyleSheet.create({
  fullScreen: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'gray',
  },
});
