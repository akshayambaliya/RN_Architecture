import React, { PureComponent } from 'react';
import { Text, View, Animated, PanResponder, TouchableOpacity } from 'react-native';
import ResponsiveStyleSheet from '../../lib/ResponsiveStyleSheet';

class OverlayButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      panResponder: {},
    };

    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.pan.x,
            dy: this.state.pan.y,
          },
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
      },
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        // return true if user is swiping, return false if it's a single click
        gestureState.dx !== 0 && gestureState.dy !== 0,
      onMoveShouldSetResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
    });
  }

  _renderDraggable() {
    return (
      <View style={styles.draggableContainer}>
        <Animated.View
          {...this.state.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}
        >
          <TouchableOpacity onPress={this.props.onPress}>
            <View style={styles.circle2}>
              <Text
                style={{ color: 'white', textAlign: 'center', fontSize: 12 }}
              >
                Dev Menu
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  render() {
    return !this.props.status ? this._renderDraggable() : null;
  }
}
const CIRCLE_RADIUS = 25;

const styles = ResponsiveStyleSheet.create({
  draggableContainer: {
    position: 'absolute',
    bottom: 50,
    right: 50,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  circle2: {
    backgroundColor: 'orange',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OverlayButton;
