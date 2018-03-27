import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {AppBar, Tabs, withStyles, Toolbar} from 'material-ui';
import ClosableTab from './ClosableTab.js';
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

class UsersTabBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    labels: PropTypes.arrayOf(PropTypes.string),
    handleTabChange: PropTypes.func,
    forcedTab: PropTypes.number,
    closable: PropTypes.bool,
    withButtons: PropTypes.bool,
  };

  /*static defaultProps = {
    labels: ["User 1", "User 2", "User 3"]
  };*/

  state = {
    selectedTab: 0
  };

  handleChange = (event, value) => {
    this.setState({selectedTab: value});
    this.props.handleTabChange(value);
  };

  render() {
    var tabVal;
    const {classes, withButtons} = this.props;

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
            <ClosableTab label={label} closable={this.props.closable && i !== 0} />
          ))}        
          
          { withButtons ?
            (
              <Toolbar>
              <Button className={[classes.button, classes.icon]} variant="raised" color="primary" size="small">
                Rafraîchir
                <Refresh color="white" className={classNames(classes.rightIcon)}/>
              </Button>
                
              <Button className={classes.button} variant="raised" color="secondary" size="small">
                Télécharger
                <FileDownload className={classNames(classes.rightIcon, classes.iconSmall)} />
              </Button>
            </Toolbar>
            ) : (<div/>)
          }

        </Tabs>  

      </AppBar>
    );
  }
}

export default withStyles(styles)(UsersTabBar);
