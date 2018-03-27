import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, GridListTile, Typography, withStyles} from 'material-ui';

const styles = theme => ({
  card: {
    height: '100%',
    padding: theme.spacing.unit / 2,
    boxShadow: 'unset',
    '&:hover': {
      border: '1px solid #e5e5e5',
      borderRadius: 2,
      padding: `calc(${theme.spacing.unit / 2}px - 1px)`,
      cursor: 'pointer'
    }
  },
  media: {
    height: `calc(100% - ${theme.typography.subheading.fontSize}*2)`
  },
  userName: {
    textAlign: 'center',
    userSelect: 'none'
  },
  link: {
    textDecoration: 'none'
  }
});

class UserIcon extends PureComponent {
  static muiName = 'GridListTile';

  static propTypes = {
    ...GridListTile.propTypes,
    classes: PropTypes.object.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userid: PropTypes.string.isRequired,
    getusercallback: PropTypes.func,
    user: PropTypes.shape({
      prenom: PropTypes.string,
      nom: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string,
      email: PropTypes.string,
    })
  };

  handleClick = () => {
    console.log(`User ${this.props.name} clicked.`);
    this.props.getusercallback(this.props.user);
  }

  render() {
    const {classes, logo, user, name, ...baseProps} = this.props;

    return (
      <GridListTile {...baseProps}>
        <a className={classes.link}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={logo}
              title={name}
              onClick={this.handleClick}/>
            <Typography variant="subheading" className={classes.userName}>
              {this.props.name}
            </Typography>
          </Card>
        </a>
      </GridListTile>
    );
  }
}

export default withStyles(styles)(UserIcon);
