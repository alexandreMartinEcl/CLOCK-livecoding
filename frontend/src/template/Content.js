import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from 'material-ui';

const styles = theme => ({
  btnLine: {
    margin: '15px'
  },
  
  centerFrame: {
    backgroundColor: theme.palette.primary.main,
    margin: 'auto',
    maxWidth: '400px',
    padding: '13px'
  }
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

      <div className={this.props.classes.btnLine}>
        <Button variant="raised" color="secondary">
          Rejoindre une session
        </Button>
      </div>
        
      <div className={this.props.classes.btnLine}>
        <Button variant="flat" color="secondary">
          Créer une session
        </Button>
      </div>
      
      </div>
        
      </div>
    )
  }
}

export default withStyles(styles)(Content);
