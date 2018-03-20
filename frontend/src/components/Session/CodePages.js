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
import { updateCodes } from '../../repository/session.repository';

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
        codes: PropTypes.arrayOf(PropTypes.shape({
            username: PropTypes.string,
            title: PropTypes.string,
            html: PropTypes.string,
            css: PropTypes.string,
            js: PropTypes.string,
        })).isRequired,
        sessionHash: PropTypes.string.isRequired,
    };

    static defaultProps = {
        className: '',
        users: [
            {
                username: '',
                title: 'Mon espace',
                html: '',
                css: '',
                js: '',
            },
        ]
    };

    state = {
        users: [],
        selectedUser: 0,
        codeUpdateOrdered: false,
    };

    keyToMode = {
        'html': 'html',
        'css': 'css',
        'js': 'js',
    };

    keyToTabValue = {
        'html': 0,
        'css': 1,
        'js': 2,
    }

    componentWillMount(){
        const users = this.props.codes.map((user) => {
            user.selectedKey = "html";
            return user;
        });
        this.setState({
            users: users,
        });
        console.log("CodePages will mount with htmlTxt: " + this.state.users[this.state.selectedUser].html);
    }

    handleChange = (code) => {
        var users = this.state.users.slice();
        const slctUser = this.state.selectedUser;
        const key = users[slctUser].selectedKey;
        users[slctUser][key] = code;
        this.setState( {users: users} );

        if (slctUser === 0) {
            if (!this.state.codeUpdateOrdered) {
                console.log(`Launches code update order`)
                this.setState({codeUpdateOrdered: true});
                setTimeout(() => {
                    this.updateUserCodes()
                }, 3000);
            }
        }
    }

    updateUserCodes = async () => {
        const {username, html, css, js} = this.state.users[0]
        const res = await updateCodes(this.props.sessionHash, username, html, css, js);

        if (res.success) {
            console.log("Update succeed");
        } else {
            console.log(res.message);
            alert(res.message);
        }
    }

    changePage = (tabValue) => {
        console.log(`Changed tab: ${tabValue}`);
        var users = this.state.users.slice();
        if (tabValue === 0){
            console.log("Changed for: html");
            users[this.state.selectedUser].selectedKey = "html";
            this.setState({ users: users });
        } else if (tabValue === 1) {
            console.log("Changed for: css");
            users[this.state.selectedUser].selectedKey = "css";
            this.setState({ users: users });
        } else if (tabValue === 2) {
            console.log("Changed for: js");
            users[this.state.selectedUser].selectedKey = "js";
            this.setState({ users: users });
        }
    }

    changeUser = (tabValue) => {
        console.log(`Changed user: ${tabValue}`);
        if (tabValue >= this.state.users.length) {
            const allUsers = this.props.codes.map((code) => {
                code.selectedKey = "html";
                return code;
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

    render() {
        const user = this.state.users[this.state.selectedUser];
        return (
            <div className={this.props.className}>
                <TabBar
                labels={this.props.codes.map( (code) => (code.title))} 
                handleTabChange={this.changeUser}/>

                <TabBar
                labels={["html", "css", "js"]}
                handleTabChange={this.changePage}
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
