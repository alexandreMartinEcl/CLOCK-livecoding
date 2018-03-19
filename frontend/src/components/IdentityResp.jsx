import React from 'react';
import { withStyles } from 'material-ui';

import { backendCheckUser } from '../repository/user.repository';
import PropTypes from 'prop-types';
import IsOk from "./IsOk";
import IsNotOk from "./IsNotOk";

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
    sessionFunc: PropTypes.func
  };

  state = {
    user: {
      username: "",
      role: "",
      nom: "",
      prenom: "",
      email: "",
    },
    authentified: false,
    requested: false,
  }

  componentWillMount() {
    console.log("IdentityResp mounted");
  }

  async componentDidMount(){
    const {user, success, message} = await backendCheckUser();
    if (success) {
      this.setState({user: user, authentified: true, requested: true});
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
          user={this.state.user} 
          contentOpenSession={this.props.sessionFunc}
        />
      );
    } else {
      return <IsNotOk/>;
    }  
  }
}

export default withStyles(styles)(IdentityResp);
