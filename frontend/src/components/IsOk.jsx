import React from 'react';
import PropTypes from 'prop-types';
import { reqCreateSession, reqGetSession } from '../repository/session.repository';
import {withStyles} from 'material-ui';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  whiteText: {
    color: 'white',
    '&::before': {
      backgroundColor: 'rgba(255, 255, 255, 0.42) !important'
    },
    '&::after': {
      backgroundColor: 'white'
    }
  },
  centerFrame: {
    backgroundColor: theme.palette.primary.main,
    margin: 'auto',
    maxWidth: '400px',
    padding: '13px'
  },
});

class IsOk extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    name: PropTypes.string,
    contentOpenSession: PropTypes.func
  };

  state = {
    sessionId: ""
  }

  handleChange = (event) => {
    this.setState({sessionId: event.target.value});
  }

  getSession = async () => {
    const res = await reqGetSession(this.state.sessionId, "userid");
    if (res.status === "ok") {
      this.props.contentOpenSession(res.htmlTxt, res.cssTxt, res.jsTxt, this.state.sessionId, res.users);
    } else {
      // add popup
      console.log("Lol");
    }
  }

  createSession = async () => {
    const res = await reqCreateSession("userid");
    if (res.status === "ok") {
      this.props.contentOpenSession("", "", "", res.sessionId, []);
    } else {
      // add popup
      console.log("Lol");
    }
  }

  render() {
    return (
      <div>
        <div className={this.props.className}>
        <div className={this.props.classes.centerFrame}>

          <p>Bienvenue {this.props.name} </p>
          <TextField
            label="Code de la session"
            id="margin-none"
            defaultValue=""
            onChange={this.handleChange}
            labelClassName={this.props.classes.whiteText}
            helperTextClassName={this.props.classes.whiteText}
            InputProps={{className: this.props.classes.whiteText}}
            className={this.props.classes.textField}
            //helperText="Some important text"
          />
          <button onClick={this.getSession} >Connect to session</button>
          <button onClick={this.createSession} >New session</button>
        </div>

      </div>        
      </div>

    );
  }
}

export default withStyles(styles)(IsOk);
