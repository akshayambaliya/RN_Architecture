import React, { PureComponent } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as featureToggleActions from './featureToggleActions';
import { getEligibleFeatureToggles } from './featureToggleSelector';
import { filterFeatureToggles } from './utils/featureToggleUtils';
import ResponsiveStyleSheet from '../../lib/ResponsiveStyleSheet';

const mapStateToProps = (state) => ({
  featureToggles: getEligibleFeatureToggles(state),
});

const mapDispatchToProps = (dispatch) => ({
  featureToggleActions: bindActionCreators(featureToggleActions, dispatch),
});

class FeatureToggleScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      toggleList: props.featureToggles,
    };
  }

  componentDidMount() {
    // this.props.featureToggleActions.processLocalToggles();
  }

  _renderSearchBar() {
    const { featureToggles } = this.props;

    return (
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={searchText => {
            const toggles = filterFeatureToggles(featureToggles, searchText);
            this.setState({
              toggleList: toggles,
            });
          }}
          placeholder="Search Feature Toggles"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          style={styles.searchText}
          testID="TextInput_Search"
        />
      </View>
    );
  }

  _onSwitchValueChange(isToggleActive, featureToggleKey) {
    this.props.featureToggleActions.setFeatureToggles({ [featureToggleKey]: isToggleActive });

    const featureToggle = this.state.toggleList;
    featureToggle[featureToggleKey] = { ...featureToggle[featureToggleKey], value: isToggleActive };

    this.setState({
      toggleList: featureToggle,
    });
  }

  _renderSectionTitle(title) {
    return (
      <View style={styles.sectionTitleWrapperStyle}>
        <Text
          style={[styles.containerPadding, { textAlign: 'center' }]}
        >
          {title}
        </Text>
      </View>
    );
  }

  _renderToggles(filter) {
    const { toggleList } = this.state;

    return Object.keys(toggleList)
      .filter(filter)
      .map((toggleKey, index) => {
        const featureToggle = toggleList[toggleKey];
        const hasFeatureToggle = !featureToggle.ignoreFeatureToggle;
        return (
          <View key={toggleKey} style={[styles.containerPadding, { paddingVertical: 20 }]}>
            {featureToggle.ignoreFeatureToggle && <View style={styles.divider} />}
            {hasFeatureToggle && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Text style={styles.displayName}>{featureToggle.displayName}</Text><Switch
                value={toggleList[toggleKey].value}
                onValueChange={value => this._onSwitchValueChange(value, toggleKey)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={toggleList[toggleKey].value ? "#f5dd4b" : "#f4f3f4"}
              />
              </View>

            )}
            <View style={{ flexDirection: 'row' }}>
              {!!featureToggle.description && (
                <Text style={styles.description}>{featureToggle.description}</Text>
              )}
              {hasFeatureToggle && (
                <Text style={styles.defaultText}>
                  Default: {featureToggle.defaultValue ? 'ON' : 'OFF'}
                </Text>
              )}
            </View>
          </View>
        );
      });
  }

  render() {
    const { toggleList } = this.state;

    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {this._renderSearchBar()}
        {this._renderSectionTitle('Feature Toggles')}
        {this._renderToggles(toggleKey => !toggleList[toggleKey].isOpsToggle)}
        <TouchableOpacity style={{ padding: 20, backgroundColor: 'red' }} onPress={() => {
          this.props.featureToggleActions.resetToggles();
        }}>
          <Text>Reset to Default Values</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = ResponsiveStyleSheet.create({
  containerPadding: {
    handset: {
      marginHorizontal: 15,
    },
    tablet: {
      marginHorizontal: 25,
    },
  },
  searchBar: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 5,
  },
  searchIcon: {
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 10,
  },
  searchText: {
    flex: 1,
    handset: {
      fontSize: 16,
    },
    tablet: {
      fontSize: 21,
    },
    padding: 0,
  },
  sectionTitleWrapperStyle: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    fontSize: 18
  },
  row: { flexDirection: 'row', flex: 1 },
  description: {
    flex: 1,
    color: 'black',
  },
  displayName: {
    color: 'black',
    fontSize: 18
  },
  divider: {
    backgroundColor: 'red',
    height: 5,
    marginHorizontal: -40,
  },
  defaultText: {
    paddingLeft: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeatureToggleScreen);
