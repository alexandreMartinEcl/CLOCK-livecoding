import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from 'material-ui';
import TextField from 'material-ui/TextField';

import { reqCreateSession, reqGetSession } from '../../repository/session.repository';

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
  btnLine: {
    margin: '15px'
  }
});

class IsOk extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    user: PropTypes.shape({
      prenom: PropTypes.string,
      nom: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    contentOpenSession: PropTypes.func
  };

  state = {
    sessionId: ""
  }

  handleChange = (event) => {
    this.setState({sessionId: event.target.value});
  }

  getSession = async () => {
    const res = await reqGetSession(this.state.sessionId);
    this.openSession(res, "found");
  }

  createSession = async () => {
    const res = await reqCreateSession("userid");
    res.result.code = {
      html: "", 
      css: "",
      js: "",
    }
    this.openSession(res, "created");
  }

  openSession = (res, adj) => {
    if (res.success) {
      console.log(`Session ${adj}`);
      const {code, hash, users, name} = res.result;
      this.props.contentOpenSession(code, hash, users, name);
    } else {
      alert(res.message);
      console.log(`Error: ${res.message}`);
    }
  }

  render() {
    const {className, classes, user} = this.props;
    return (
      <div>
        <div className={className}>
        <div className={classes.centerFrame}>

          <p className={classes.whiteText}>Bienvenue {user.prenom + " " + this.props.user.nom} </p>
          <TextField
            label="Code de la session"
            id="margin-none"
            defaultValue=""
            onChange={this.handleChange}
            labelClassName={classes.whiteText}
            helperTextClassName={classes.whiteText}
            InputProps={{className: classes.whiteText}}
            className={classes.textField}
            //helperText="Some important text"
          />
        
        <div className={classes.btnLine}>
          <Button variant="raised" color="secondary" onClick={this.getSession}>
            Rejoindre une session
          </Button>
        </div>
          
        <div className={classes.btnLine}>
          <Button variant="flat" color="secondary" onClick={this.createSession}>
            Créer une session
          </Button>
        </div>
        
        </div>

      </div>        
      </div>

    );
  }
}

export default withStyles(styles)(IsOk);
