import React from 'react';
import { withStyles } from 'material-ui';

import { backendCheckUser } from '../../repository/user.repository';
import PropTypes from 'prop-types';
import IsOk from "./IsOk";

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
  }
});

class IdentityResp extends React.PureComponent {
  static propTypes = {
    userData: PropTypes.shape({
      name: PropTypes.string,
      authentified: PropTypes.bool
    }),
    openSession: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      role: PropTypes.string,
      nom: PropTypes.string,
      prenom: PropTypes.string,
      email: PropTypes.string,
    }),
  };

  state = {
    authentified: false,
    requested: false,
  }

  componentWillMount() {
    console.log("IdentityResp mounted");
  }

  async componentDidMount(){
    const {user, success, message} = await backendCheckUser();
    if (success) {
      console.log(`User authentified: ${user.username}`)
      this.props.setUser(user);
      this.setState({requested: true, authentified: true});
    } else {
      console.log(message);
      this.setState({requested: true});
    }
  }

  render() {
    if(!this.state.requested){
      return (
      <div>Checking User</div>
      );
    }

    if(this.state.authentified){
      return (
        <IsOk 
          user={this.props.user} 
          contentOpenSession={this.props.openSession}
        />
      );
    } else {
      return <div>Error: you should have been redirected to authentification</div>;
    }  
  }
}

export default withStyles(styles)(IdentityResp);
