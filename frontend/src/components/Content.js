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
import { downloadZip } from '../repository/zip.repository';

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
    margin: '5px'
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

  //used for opening users menu
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

  /**
   * set the user data who just connected to the app
   * called in IdentityResp after requesting the backend with the token
   * user = {username, role, prenom, nom, email}
   */
  setCurrentUser = (user) => {
    console.log("Updating currentUser");
    this.setState({currentUser: user});
  }

  /**
   * download the three files of the code of a certain loaded user
   * zipped
   */
  downloadCode = (username) => {
    console.log(`Getting ${username}'s zipped code`);
    var usersC = this.state.usersCodes;
    var user;

    for(var i=0; i<usersC.length; i++){
      user = usersC[i];

      if(user.username === username) {
        var {html, css, js} = user;
      }
    }
    downloadZip(html, css, js, username, this.state.session.hash);
  }

  /**
   *  change the code from an already loaded user
   */
  updateUserCode = (username, html, css, js) => {
    console.log(`Updating user ${username} to Content.state`);
    var usersC = this.state.usersCodes.slice();
    var user;
    for(var i=0; i<usersC.length; i++){
      user = usersC[i];

      if(user.username === username) {
        user.html = html;
        user.css = css;
        user.js = js;
        usersC[i] = user;
      }
    }

    this.setState({usersCodes: usersC});
  }

  /**
   *  adds a new user tab
   */
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

  /**
   *  remove from users tabs one the one whom the username is asked
   *  called in CodePages > UsersTabs > ClosableTab
   */
  removeUserCode = (username) => {
    console.log(`Removing user ${username} from Content.state`);
    var usersC = [];
    this.state.usersCodes.forEach((user)=>{
      if (user.username !== username) {
        usersC.push(user);
      }      
    });
    this.setState({usersCodes: usersC});
  }
  
  /**
   *  return boolean
   * if the asked code is already loaded
   * it cannot be asked again
   */
  userAlreadyLoaded = (username) => {
    var res = false;

    this.state.usersCodes.forEach((code) => {
      if (code.username === username) {
        res = true;
      }
    })
    return res;
  }

  /**
   *  return boolean
   * if user is 'intervenant', it can access all codes
   * if the asked code is from 'intervenant', it is ok
   * else it cannot be loaded
   */
  userWatchable = (user) => {
    if (user.role === 'intervenant') {
      return true;
    } else if (this.state.currentUser.role === 'intervenant' || this.state.currentUser.role === 'administrateur') {
      return true;
    } else {
      return false;
    }
  }

  /**
   *  ask for a new user's code
   * called in UsersMenu > UserIcon 
   * will just alert if already loaded or if the connected user is not allowed
   * will add the user to new user tab if success
   * askedUser = {username: oneUsername}
   */
  openNewUser = async (askedUser) => {
    const {username} = askedUser;
    console.log(`Getting new user's code: ${username}`);

    if (this.userAlreadyLoaded(username)) {
      const msg = `User's code already loaded`;
      alert(msg);
      return;
    } else if (!this.userWatchable(askedUser)) {
      const msg = `You do not have permission to see `;
      alert(msg);
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

  /**
   *  ask for a loaded user's refreshed code
   * called in CodePages > UsersTabBar
   * will replace the user's code to existing user tab if success
   * askedUser = {username: oneUsername}
   */
  refreshUser = async (username) => {
    console.log(`Updating ${username}'s code`);
    const res = await getUserCode(this.state.session.hash, username);

    console.log("Result: ");
    console.log(res);

    if (res.success) {
      const { user } = res.result;
      this.updateUserCode(user.user.username, user.html, user.css, user.js);
    } else {
      console.log(res.message);
      alert(res.message);
    }
  }

  /**
   *  Open a new session after user is authentified
   * called in IdentityResp > IsOk
   * will replace IdentityResp with CodePages in render
   * will fill CodePages with the user's tab, and his session data
   * requested from back : code = {html, css, js}, users=[user:{username, firstName}]
   */
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
          <Chip label={`CODE : ${session.hash}`} className={classes.chip} />
          
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
            currUserRole={this.state.currentUser.role}
            refreshFunction={this.refreshUser}
            dwnldFunction={this.downloadCode}
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
