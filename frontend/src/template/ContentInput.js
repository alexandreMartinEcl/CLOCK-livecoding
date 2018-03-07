import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from 'material-ui';
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

class Content extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  static defaultProps = {
    className: ''
  };

  render() {
    return (
      <div className={this.props.className}>
      
      <div className={this.props.classes.centerFrame}>
      <TextField
        label="Code de la session"
        id="margin-none"
        defaultValue=""
        labelClassName={this.props.classes.whiteText}
        helperTextClassName={this.props.classes.whiteText}
        InputProps={{className: this.props.classes.whiteText}}
        className={this.props.classes.textField}
        //helperText="Some important text"
      />
      
      </div>
        
      </div>
    )
  }
}

export default withStyles(styles)(Content);