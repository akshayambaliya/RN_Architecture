import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { connect } from 'react-redux';
import ResponsiveStyleSheet from '../../lib/ResponsiveStyleSheet';


class ReduxLoggerScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <View style={styles.fullScreen}>
                    <JSONTree data={this.props.reduxState} />
                </View>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    reduxState: state
});

const mapDispatchToProps = (dispatch) => ({
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReduxLoggerScreen);

const styles = ResponsiveStyleSheet.create({
    fullScreen: {
        height: '100%',
        width: '100%',
    },
});
