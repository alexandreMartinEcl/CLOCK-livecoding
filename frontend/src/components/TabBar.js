import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Tabs, Tab, withStyles} from 'material-ui';

const styles = {};

class TabBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string),
    handleTabChange: PropTypes.func,
    forcedTab: PropTypes.number,
  };

  static defaultProps = {
    labels: ["User 1", "User 2", "User 3"]
  };

  state = {
    selectedTab: 0
  };

  handleChange = (event, value) => {
    this.setState({selectedTab: value});
    this.props.handleTabChange(value);
  };

  render() {
    var tabVal;
    if (typeof this.props.forcedTab !== 'undefined') {
      tabVal = this.props.forcedTab;
    } else {
      tabVal = this.state.selectedTab;
    }
    return (
      <AppBar position="static">
        <Tabs
          value={tabVal}
          onChange={this.handleChange}
          fullWidth>

          {this.props.labels.map((label, i) => <Tab label={label} />)}
        </Tabs>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TabBar);
