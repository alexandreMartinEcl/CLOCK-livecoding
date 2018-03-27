import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab } from "material-ui";
import Close from "material-ui-icons/Close";

class ClosableTab extends PureComponent {
  static muiName = 'Tab';

  static propTypes = {
    ...Tab.propTypes,
    label: PropTypes.string.isRequired,
    closable: PropTypes.bool,
    funcRemoveUser: PropTypes.func,
    idTab: PropTypes.string,
  };

  removeUser = () => {
    console.log("Askes for closing user tab");
    this.props.funcRemoveUser(this.props.idTab);
  }

  render() {
    const { label, closable, funcRemoveUser, idTab, ...baseProps } = this.props;

    return (
      <Fragment>
        <Tab label={label} {...baseProps} />
        {closable && <Close onClick={this.removeUser} color="secondary" cursor="pointer"/>}
      </Fragment>
    );
  }
}

export default ClosableTab;
