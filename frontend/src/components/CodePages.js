import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';
import 'brace/ext/language_tools';

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
        jsTxt: PropTypes.string,
        classes: PropTypes.object
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
        selectedKey: 'htmlTxt',
        selectedMode: 'html'
    };

    componentWillMount(){
        this.setState({
            htmlTxt: this.props.htmlTxt,
            cssTxt: this.props.cssTxt,
            jsTxt: this.props.jsTxt
        });
        console.log("CodePages will mount with htmlTxt: " + this.state.htmlTxt);
    }

    /*
    handleChange = (event) => {
//        this.setState( {htmlTxt: event.target.value});
        this.setState( {[this.state.selectedKey]: event.target.value});
    } 
    */   

    handleChange = (code) => {
        this.setState( {[this.state.selectedKey]: code});
    } 
    
    changeContent = (tabValue) => {
        console.log("Changed tab: " + tabValue)
        if (tabValue === 0){
            console.log("Changed for: html");
            this.setState({ selectedKey: "htmlTxt" });
            this.setState({ selectedMode: "html" })
        } else if (tabValue === 1) {
            console.log("Changed for: css");
            this.setState({ selectedKey: "cssTxt" });
            this.setState({ selectedMode: "css" })
        } else if (tabValue === 2) {
            console.log("Changed for: js");
            this.setState({ selectedKey: "jsTxt" });
            this.setState({ selectedMode: "javascript" })
        }
    }

  render() {
        return (
            <div className={this.props.className}>
                <TabBar 
                labels={["html", "css", "js"]}
                handleTabChange={this.changeContent} 
                />

                <AceEditor
                mode={this.state.selectedMode}
                theme="tomorrow_night"
                name="codeEditor"
                onChange={this.handleChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state[this.state.selectedKey]}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                width={'100%'}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CodePage);
