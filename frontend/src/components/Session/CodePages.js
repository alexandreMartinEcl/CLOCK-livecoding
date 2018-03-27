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
import UsersTabBar from './UsersTabBar';
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
        currUserRole: PropTypes.string.isRequired,
        sessionHash: PropTypes.string.isRequired,
        removeUser: PropTypes.func.isRequired,
        refreshFunction: PropTypes.func.isRequired,
        dwnldFunction: PropTypes.func.isRequired,
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
        users: [
            {
                username: '',
                title: 'Mon espace',
                html: '',
                css: '',
                js: '',
                selectedKey: '',
                codeUpdateOrdered: false,
            }
        ],
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
            user.codeUpdateOrdered = false;
            return user;
        });
        console.log(users[0]);
        this.setState({
            users: users,
            selectedUser: 0,
        });
        console.log(this.state);
        console.log("CodePages will mount with htmlTxt: " + this.state.users[this.state.selectedUser].html);
    }

    componentDidUpdate(){
        console.log("Code pages did update: loading render");
        if (this.state.users[this.state.selectedUser].selectedKey ==="render") {
            this.makeIframe();
        }
    }

    handleChange = (code) => {
        const slctUser = this.state.selectedUser;
        if (slctUser === 0 || this.props.currUserRole === "intervenant") {
            var users = this.state.users.slice();
            const key = users[slctUser].selectedKey;
            users[slctUser][key] = code;
            this.setState( {users: users} );

            if (!this.state.users[slctUser].codeUpdateOrdered) {
                console.log(`Launches code update order`)
                
                const updatedUsers = this.state.users;
                updatedUsers[slctUser].codeUpdateOrdered = true;
                this.setState({users: updatedUsers});                
//                this.setState({codeUpdateOrdered: true});
                setTimeout(() => {
                    this.updateUserCodes(slctUser)
                }, 3000);
            }
        } else {
            console.log("Not allowed to update this code");
        }
    }

    updateUserCodes = async (slctUser) => {
        const {username, html, css, js} = this.state.users[slctUser]
        const res = await updateCodes(this.props.sessionHash, username, html, css, js);

        if (res.success) {
            console.log("Update succeed");
        } else {
            console.log(res.message);
            alert(res.message);
        }
        const updatedUsers = this.state.users;
        updatedUsers[slctUser].codeUpdateOrdered = false;
        this.setState({users: updatedUsers});                

//        this.setState({codeUpdateOrdered: false});
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
        } else if (tabValue === 3) {
            console.log("Changed for: render");
            users[this.state.selectedUser].selectedKey = "render";
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

    buildIframeContent = (slctUser) => {
        console.log(`Building render`);
        var {html, css, js} = this.state.users[slctUser];
        var base_tpl ="".concat(
            "<!doctype html>\n",
            "<html>\n\t",
            "<head>\n\t\t",
            "<meta charset=\"utf-8\">\n\t\t",
            "<title>Test</title>\n\n\t\t\n\t",
            "</head>\n\t",
            "<body>\n\t\n\t",
            "</body>\n",
            "</html>");
            		// HTML
		var src = base_tpl.replace('</body>', `${html}</body>`);
		
		// CSS
		css = `<style>${css}</style>`;
		src = src.replace('</head>',`${css}</head>`);
		
		// Javascript
		js = `<script>${js}</script>`;
		src = src.replace('</body>', `${js}</body>`);
		
        return src;

    }

    makeIframe = () => {
        var source = this.buildIframeContent(this.state.selectedUser);
		
        var iframe = document.querySelector('iframe'),
            iframe_doc = iframe.contentDocument;
        
        iframe_doc.open();
        iframe_doc.write(source);
        iframe_doc.close();                            

        return;
    }

    render() {
        const user = this.state.users[this.state.selectedUser];
        return (
            <div className={this.props.className}>
                <UsersTabBar 
                    handleTabChange={this.changeUser}
                    labels={this.props.codes.map( (code) => ({label: code.title, id: code.username}))}
                    funcRemoveUser={this.props.removeUser}
                    refreshFunction={this.props.refreshFunction}
                    dwnldFunction={this.props.dwnldFunction}
                />


                <TabBar
                labels={["html", "css", "js", "render"]}
                handleTabChange={this.changePage}
                forcedTab={this.keyToTabValue[user.selectedKey]}
                />

                {user.selectedKey === "render" ? 
                    (
                        <iframe title='iframe' width={'100%'}/>
                    ) : (
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
                    )
                }

            </div>
        );
    }
}

export default withStyles(styles)(CodePage);
