import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField } from 'material-ui';

import TabBar from './TabBar';

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

class CodePage extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        htmlTxt: PropTypes.string,
        cssTxt: PropTypes.string,
        jsTxt: PropTypes.string
    };

    static defaultProps = {
        className: '',
        htmlTxt: '',
        cssTxt: '',
        jsTxt: ''
    };

    state = {
        htmlTxt: '',
        cssTxt: '',
        jsTxt: '',
        selectedKey: 'htmlTxt'
    };

    componentWillMount(){
        this.setState({
            htmlTxt: this.props.htmlTxt,
            cssTxt: this.props.cssTxt,
            jsTxt: this.props.jsTxt
        });
        console.log("CodePages will mount with htmlTxt: " + this.state.htmlTxt);
    }

    handleChange = (event) => {
//        this.setState( {htmlTxt: event.target.value});
        this.setState( {[this.state.selectedKey]: event.target.value});
    }    

    changeContent = (tabValue) => {
        console.log("Changed tab: " + tabValue)
        if (tabValue === 0){
            console.log("Changed for: html");
            this.setState({selectedKey: "htmlTxt"});
        } else if (tabValue === 1) {
            console.log("Changed for: css");
            this.setState({selectedKey: "cssTxt"});
        } else if (tabValue === 2) {
            console.log("Changed for: js");
            this.setState({selectedKey: "jsTxt"});
        }
    }

  render() {
        return (
            <div className={this.props.className}>
                <TabBar 
                labels={["html", "css", "js"]}
                handleTabChange={this.changeContent} 
                />
                <TextField
                    label="Contenu"
                    id="margin-none"
                    value={this.state[this.state.selectedKey]}
                    //defaultValue={this.state.selectedKey}
                    onChange={this.handleChange}
/*
                    labelClassName={this.props.classes.whiteText}
                    helperTextClassName={this.props.classes.whiteText}
                    InputProps={{className: this.props.classes.whiteText}}
                    className={this.props.classes.textField}
                    //helperText="Some important text"
*/
                />

            </div>
        );
    }
}

export default withStyles(styles)(CodePage);
