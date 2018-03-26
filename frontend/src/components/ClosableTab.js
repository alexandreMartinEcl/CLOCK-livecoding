import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { Tab } from "material-ui";
import Close from "material-ui-icons/Close";

class ClosableTab extends PureComponent {
  static muiName = 'Tab';

  static propTypes = {
    ...Tab.propTypes,
    label: PropTypes.string.isRequired,
    closable: PropTypes.bool
  };

  render() {
    const { label, closable, ...baseProps } = this.props;

    return (
      <Fragment>
        <Tab label={label} {...baseProps} />
        {closable && <Close color="secondary" />}
      </Fragment>
    );
  }
}

export default ClosableTab;
