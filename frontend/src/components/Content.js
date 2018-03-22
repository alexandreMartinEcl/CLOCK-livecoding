import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import { Tooltip, IconButton, withStyles } from 'material-ui';
import Chip from 'material-ui/Chip';
import {Group as UsersIcon} from 'material-ui-icons';

import UsersMenu from './Session/UsersMenu';
import IdentityResp from './Auth/IdentityResp';
import CodePages from './Session/CodePages';
import { getUserCode } from '../repository/user.repository';

const styles = theme => ({
  root: {
    marginTop: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      marginTop: 48
    },
    '@media (min-width:600px)': {
      marginTop: 64
    }
  },
  content: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
  },
  chip: {
    margin: '15px'
  }
});

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: ''
  };

  state = {
    session: {
      opened: false,
      hash: "",
      name: "",  
    },
    users: [],
    usersCodes: [],
    currentUser: {
      username: "",
      role: "",
      nom: "",
      prenom: "",
      email: "",
    },
    usersMenuOpen: false,
    anchorEl: null,
  };

  button = null;

  handleUsersMenuClick = () => {
    this.setState({
      usersMenuOpen: true,
      anchorEl: findDOMNode(this.button)
    });
  };

  handleUsersMenuClose = () => {
    this.setState({
      usersMenuOpen: false,
    });
  };

  setCurrentUser = (user) => {
    console.log("Updating currentUser");
    this.setState({currentUser: user});
  }

  addUserCode = (username, title, html, css, js) => {
    console.log(`Adding user ${username} to Content.state`);
    var usersC = this.state.usersCodes.slice();
    usersC.push({
      username: username,
      title: title,
      html: html,
      css: css,
      js: js,
    });
    this.setState({usersCodes: usersC});
  }

  removeUserCode = (username) => {
    console.log(`Removing user ${username} to Content.state`);
    var usersC = [];
    this.state.usersCodes.forEach((user)=>{
      if (user.username !== username) {
        usersC.push(user);
      }      
    });
    this.setState({usersCodes: usersC});
  }
    
  openNewUser = async (username) => {
    console.log(`Getting new user's code: ${username}`);
    var alreadySet = false;

    this.state.usersCodes.forEach((code) => {
      if (code.username === username) {
        alreadySet = true;
      }
    })

    if (alreadySet) {
      console.log(`Code already here`);
      return;
    }

    const res = await getUserCode(this.state.session.hash, username);
    console.log("Result: ");
    console.log(res);

    if (res.success) {
      const { user } = res.result;
      this.addUserCode(user.user.username, user.user.prenom, user.html, user.css, user.js);
    } else {
      console.log(res.message);
      alert(res.message);
    }

  }

  openSession = (code, hash, users, name) => {
    name = name || hash;
    console.log(`Session opened (html: ${code.html}, css: ${code.css}, js: ${code.js}, sessionHash: ${hash}, sessionName: ${name}, users: `);
    console.log(users);

    this.addUserCode(this.state.currentUser.username, "Mon espace", code.html, code.css, code.js);

    this.setState({session: {opened: true, hash, name}, users: users});
  };

  render() {
    const {className, classes} = this.props;
    const {session, users, usersMenuOpen, anchorEl, usersCodes, currentUser} = this.state;
    if (this.state.session.opened){
      return (
        <div className={className}>
          <Chip label={`Session ${session.name}`} className={classes.chip} />
          
          <Tooltip id="apps-icon" title="Users">
            <IconButton
              color="inherit"
              aria-label="users"
              ref={node => this.button = node}
              onClick={this.handleUsersMenuClick}>
              <UsersIcon/>
            </IconButton>
          </Tooltip>
          <UsersMenu
            users={users}
            open={usersMenuOpen}
            anchorEl={anchorEl}
            closeCallback={this.handleUsersMenuClose}
            newUser={this.openNewUser}
          />

          <CodePages
            codes={usersCodes}
            sessionHash={session.hash}
            removeUser={this.removeUserCode}
          />
        </div>
      );
    } else {
      return (
        <div className={className}>
          <IdentityResp 
            openSession={this.openSession}
            setUser={this.setCurrentUser}
            user={currentUser} />
        </div>
      );
    }
  }
}

export default withStyles(styles)(Content);
