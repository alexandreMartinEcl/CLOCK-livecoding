import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GridList, Popover, withStyles} from 'material-ui';

import UserIcon from './UserIcon';
import logo from '../../logo.svg'

const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: 300,
    padding: '20px 15px',
    backgroundColor: theme.palette.background.paper,
  }
});

class UsersMenu extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    closeCallback: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    newUser: PropTypes.func,
    users: PropTypes.arrayOf(PropTypes.shape({
      prenom: PropTypes.string,
      nom: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
      email: PropTypes.string,
    })),
  };

  static defaultProps = {
    users: [
      {
        username: "alex",
        nom: "Martin",
        prenom: "Alex",
      },
      {
        username: "remy",
        nom: "Prioul",
        prenom: "Remy",
      },
    ]
  };

  state = {
    users: [],
  }

  componentWillMount() {
    console.log("UsersMenu mounted");
    this.setState({users: this.props.users});
  }

  render() {
    const {classes, open, closeCallback, anchorEl} = this.props;

    return (
      <Popover
        open={open}
        onClose={closeCallback}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <div className={classes.root}>
          <GridList cellHeight={100} cols={5}>
            {this.state.users.map(user => (
              <UserIcon key={user.username} logo={logo} name={user.prenom} userid={user.username} getusercallback={this.props.newUser} />
            ))}
          </GridList>
        </div>
      </Popover>
    )
  }
}

export default withStyles(styles)(UsersMenu);
