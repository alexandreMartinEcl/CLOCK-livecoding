import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, Tabs, withStyles, Toolbar} from 'material-ui';
import ClosableTab from '../ClosableTab.js';
import {FileDownload, Refresh} from 'material-ui-icons';
import Button from 'material-ui/Button';

const styles = {
  righticon: {
    marginLeft: '5px',
  },
  icon:  {
    marginLeft: '10px',
    marginRight: '10px',
  },
};

class TabBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
    })),
    handleTabChange: PropTypes.func,
    forcedTab: PropTypes.number,
    funcRemoveUser: PropTypes.func.isRequired,
    refreshFunction: PropTypes.func.isRequired,
    dwnldFunction: PropTypes.func.isRequired,
  };

  state = {
    selectedTab: 0,
  };

  handleChange = (event, value, currUsername) => {
    this.setState({selectedTab: value});
    this.props.handleTabChange(value);
  };

  refreshUser = () => {
    console.log("Refresh asked");
    this.props.refreshFunction(this.props.labels[this.state.selectedTab].id);
  }

  downloadCode = () => {
    console.log("Donwload asked");
    this.props.dwnldFunction(this.props.labels[this.state.selectedTab].id);
  }

  render() {
    var tabVal;
    const {classes} = this.props;

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
          fullWidth
          >
          {this.props.labels.map((label, i) => (
            <ClosableTab 
              label={label.label}
              closable={i !== 0}
              funcRemoveUser={this.props.funcRemoveUser}
              idTab={label.id}/>
          ))}

          <Toolbar>
            <Button 
              className={[classes.button, classes.icon]} 
              onClick={this.refreshUser}
              variant="raised"
              color="primary"
              size="small">
              Rafraîchir
              <Refresh color="white" className={classNames(classes.rightIcon)}/>
            </Button>

            <Button
              className={classes.button}
              onClick={this.downloadCode}
              variant="raised"
              color="secondary"
              size="small">
              Télécharger
              <FileDownload className={classNames(classes.rightIcon, classes.iconSmall)} />
            </Button>
          </Toolbar>

        </Tabs>

      </AppBar>
    );
  }
}

export default withStyles(styles)(TabBar);
