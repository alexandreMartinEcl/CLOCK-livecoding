import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {AppBar, Tabs, Tab, withStyles} from 'material-ui';

const styles = {};

class TabBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string),
    handleTabChange: PropTypes.func
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
    return (
      <AppBar position="static">
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          fullWidth>
          <Tab label={this.props.labels[0]}/>
          <Tab label={this.props.labels[1]}/>
          <Tab label={this.props.labels[2]}/>
        </Tabs>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TabBar);
