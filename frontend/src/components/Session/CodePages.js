import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow_night';
import 'brace/ext/language_tools';

import TabBar from '../TabBar';

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
        classes: PropTypes.object,
        users: PropTypes.arrayOf(PropTypes.shape({
            lastName: PropTypes.string,
            htmlTxt: PropTypes.string,
            cssTxt: PropTypes.string,
            jsTxt: PropTypes.string,
        })),
    };

    static defaultProps = {
        className: '',
        users: [
            {
                lastName: '',
                htmlTxt: '',
                cssTxt: '',
                jsTxt: '',
            },
        ]
    };

    state = {
        users: [
            {
                lastName: '',
                htmlTxt: '',
                cssTxt: '',
                jsTxt: '',
                selectedKey: 'htmlTxt',
            },
        ],
        selectedUser: 0,
    };

    keyToMode = {
        'htmlTxt': 'html',
        'cssTxt': 'css',
        'jsTxt': 'js',
    };

    keyToTabValue = {
        'htmlTxt': 0,
        'cssTxt': 1,
        'jsTxt': 2,
    }

    componentWillMount(){
        const users = this.props.users.map((user) => {
            user.selectedKey = "htmlTxt";
            return user;
        });
        this.setState({
            users: users,
        });
        console.log("CodePages will mount with htmlTxt: " + this.state.users[this.state.selectedUser].htmlTxt);
    }

    handleChange = (code) => {
        var users = this.state.users.slice();
        const key = users[this.state.selectedUser].selectedKey;
        users[this.state.selectedUser][key] = code;
        this.setState( {users: users});
    }

    changeContent = (tabValue) => {
        console.log(`Changed tab: ${tabValue}`);
        var users = this.state.users.slice();
        if (tabValue === 0){
            console.log("Changed for: html");
            users[this.state.selectedUser].selectedKey = "htmlTxt";
            this.setState({ users: users });
        } else if (tabValue === 1) {
            console.log("Changed for: css");
            users[this.state.selectedUser].selectedKey = "cssTxt";
            this.setState({ users: users });
        } else if (tabValue === 2) {
            console.log("Changed for: js");
            users[this.state.selectedUser].selectedKey = "jsTxt";
            this.setState({ users: users });
        }
    }

    changeUser = (tabValue) => {
        console.log(`Changed user: ${tabValue}`);
        if (tabValue >= this.state.users.length) {
            const allUsers = this.props.users.map((user) => {
                user.selectedKey = "htmlTxt";
                return user;
            });

            var currUsers = this.state.users;

            for(var i = currUsers.length; i < allUsers.length; i++){
                currUsers.push(allUsers[i]);
            }

            this.setState({
                users: currUsers,
            });
        }

        this.setState({ selectedUser: tabValue });
    }

    modeToTabValue = (user) => {

    }

  render() {
        const user = this.state.users[this.state.selectedUser];
        return (
            <div className={this.props.className}>
                <TabBar 
                labels={this.props.users.map( (user) => (user.lastName))} 
                handleTabChange={this.changeUser}/>

                <TabBar
                labels={["html", "css", "js"]}
                handleTabChange={this.changeContent}
                forcedTab={this.keyToTabValue[user.selectedKey]}
                />

                <AceEditor
                mode={this.keyToMode[user.selectedKey]}
                theme="tomorrow_night"
                name="codeEditor"
                onChange={this.handleChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={user[user.selectedKey]}
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
