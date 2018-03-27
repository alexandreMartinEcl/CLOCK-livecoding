import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GridList, Popover, withStyles} from 'material-ui';

import AppIcon from './AppIcon';
import logo_clock from '../../images/logo-clock.png';
import logo_linkapp from '../../images/logo-linkapp.png';
import logo_markus from '../../images/logo-markus.png';
import logo_oklm from '../../images/logo-oklm.png';
import logo_redline from '../../images/logo-redline.png';
import logo_sagg from '../../images/logo-sagg.png';

const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: 300,
    padding: '20px 15px',
    backgroundColor: theme.palette.background.paper,
  }
});

class AppsMenu extends PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    closeCallback: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  apps = [
    {
      name: 'OKLM',
      url: '//oklm.ebm.nymous.io',
      logo: logo_oklm
    },
    {
      name: 'Redline',
      url: '//redline.ebm.nymous.io',
      logo: logo_redline
    },
    {
      name: 'Linkapp',
      url: '//linkapp.ebm.nymous.io',
      logo: logo_linkapp
    },
    {
      name: 'Markus',
      url: '//markus.ebm.nymous.io',
      logo: logo_markus
    },
    {
      name: 'SAGG',
      url: '//sagg.ebm.nymous.io',
      logo: logo_sagg
    },
    {
      name: 'Livecoding',
      url: '//clock-livecoding.ebm.nymous.io',
      logo: logo_clock
    }
  ];

  render() {
    const {classes} = this.props;

    return (
      <Popover
        open={this.props.open}
        onClose={this.props.closeCallback}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <div className={classes.root}>
          <GridList cellHeight={100} cols={3}>
            {this.apps.map(app => (
              <AppIcon key={app.url} logo={app.logo} appName={app.name} href={app.url}/>
            ))}
          </GridList>
        </div>
      </Popover>
    )
  }
}

export default withStyles(styles)(AppsMenu);
