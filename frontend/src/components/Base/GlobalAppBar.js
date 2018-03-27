import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, IconButton, Toolbar, Tooltip, Typography, withStyles} from 'material-ui';
import {Apps as AppsIcon} from 'material-ui-icons';
import FileDownload from 'material-ui-icons/FileDownload';
import Refresh from 'material-ui-icons/Refresh';
import Button from 'material-ui/Button';

import AppsMenu from './AppsMenu';

import logo from '../../images/logo.png';

const styles = {
  appBarWithTabBar: {
    boxShadow: 'unset'
  },
  flex: {
    flex: 1,
  },
  icon:  {
    marginLeft: '10px',
    marginRight: '10px',
  }
  
};

class GlobalAppBar extends PureComponent {
  static propTypes = {
    appTitle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    hasTabBarBelow: PropTypes.bool
  };

  static defaultProps = {
    hasTabBarBelow: false
  };

  state = {
    appsMenuOpen: false,
    anchorEl: null
  };

  button = null;

  handleAppsMenuClick = () => {
    this.setState({
      appsMenuOpen: true,
      anchorEl: findDOMNode(this.button)
    });
  };

  handleAppsMenuClose = () => {
    this.setState({
      appsMenuOpen: false,
    });
  };

  render() {
    const {classes, hasTabBarBelow} = this.props;

    const appBarClasses = classNames({[classes.appBarWithTabBar]: hasTabBarBelow});

    return (
      <AppBar position="absolute" className={appBarClasses}>
        <Toolbar>
          <img src={logo} alt="ClockLC-logo" width="50px" height="50px" className={classes.icon} />        
          
          <Typography variant="title" color="inherit" className={classes.flex}>
            {this.props.appTitle}
          </Typography>
          
          <Button className={[classes.button, classes.icon]} variant="raised" color="primary">
          Rafraîchir
          <Refresh color="white" className={classNames(classes.rightIcon)}/>
          </Button>
          
          <Button className={classes.button} variant="raised" color="secondary">
          Télécharger
          <FileDownload className={classNames(classes.rightIcon, classes.iconSmall)} />
          </Button>
          
          <Tooltip id="apps-icon" title="Applications">
            <IconButton
              color="inherit"
              aria-label="Applications"
              ref={node => this.button = node}
              onClick={this.handleAppsMenuClick}>
              <AppsIcon/>
            </IconButton>
          </Tooltip>
          <AppsMenu
            open={this.state.appsMenuOpen}
            anchorEl={this.state.anchorEl}
            closeCallback={this.handleAppsMenuClose}/>
        </Toolbar>
      </AppBar>
    );
  };
}

export default withStyles(styles)(GlobalAppBar);
