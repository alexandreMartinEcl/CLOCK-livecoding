import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab } from "material-ui";
//import Close from "material-ui-icons/Close";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ClosableTab extends PureComponent {
  static muiName = 'Tab';

  static propTypes = {
    ...Tab.propTypes,
    label: PropTypes.string.isRequired,
    closable: PropTypes.bool,
    funcRemoveUser: PropTypes.func,
    idTab: PropTypes.string,
  };

  state = {
    clicked: false,
  }

  deleteConfirm = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Remove this tab ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.funcRemoveUser(this.props.idTab)
        },
        {
          label: 'Cancel',
          onClick: () => this.setState({clicked: false})
        }
      ]
    })
  }

  potentiallyRemoveUser = () => {
    console.log("Askes for closing user tab");

    if (!this.props.closable) {
      return;
    }

    if (this.state.clicked) {
      this.deleteConfirm();
    } else {
      this.setState({clicked: true});
      new Promise(resolve => {
        setTimeout(() => {
          this.setState({clicked: false});
        }, 500)
      });
    }
  }

  render() {
    const { label, closable, funcRemoveUser, idTab, ...baseProps } = this.props;

    return (
      <Fragment>
        <Tab label={label} {...baseProps} onClick={this.potentiallyRemoveUser}/>
      </Fragment>
    );
    // return (
    //   <Fragment>
    //     <Tab label={label} {...baseProps} onClick={this.potentiallyRemoveUser}/>
    //     {closable && <Close onClick={this.removeUser} color="secondary" cursor="pointer"/>}
    //   </Fragment>
    // );
  }
}

export default ClosableTab;
