import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import IdentityResp from './IdentityResp';
import CodePages from './CodePages';

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

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    sessionId: "",
    users: [],
    htmlTxt: "",
    cssTxt: "",
    jsTxt: "",
  };

  openSession = (htmlTxt, cssTxt, jsTxt, sessionId, users) => {
    console.log("Session opened (html: " + htmlTxt + ", css: " + cssTxt + ", js: " + jsTxt + ", sessionId: " + sessionId);
    this.setState({htmlTxt, cssTxt, jsTxt, sessionId, users});
  };

  render() {
    if (this.state.sessionId.length > 0){
      return (
        <div className={this.props.className}>
          Session {this.state.sessionId}
          <CodePages 
          htmlTxt={this.state.htmlTxt}
          cssTxt={this.state.cssTxt}
          jsTxt={this.state.jsTxt} 
          />
        </div>
      );
    } else {
      return (
        <div className={this.props.className}>
          <IdentityResp sessionFunc={this.openSession} />
        </div>
      );
    }
  }
}

export default withStyles(styles)(Content);
