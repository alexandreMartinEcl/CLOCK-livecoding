import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';
import AceEditor from 'react-ace';
import ReactKonami from "react-konami";

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
        toasted: false,
        konami: false,
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

    /** 
     * Prepare component with props codes
    */
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
        console.log("CodePages will mount with html: " + this.state.users[this.state.selectedUser].html);
    }

    /** 
     * Prepare Iframe if the render tab is wanted
     * (could be on user change also, that's why not called in tabChange)
    */
    componentDidUpdate(){
        if (this.state.users[this.state.selectedUser].selectedKey ==="render") {
            this.makeIframe();
        }
    }

    /**
     * Handle if the code in Ace is changed
     * code is the current value of Ace
     * Current value depends on the tabs, so we get the selectedUser
     * The user can update online only his own code, except if his role is 'intervenant'
     * If he is not allowed, we alert him once
     * Else, 
     *  We only update every 3 seconds
     *  If update is already ordered, it wont do anything
     *  The code updated is the code whom the user tab is active
     */
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
                setTimeout(() => {
                    this.updateUserCodes(slctUser)
                }, 3000);
            }
        } else {
            if (!this.state.toasted) {
                this.setState({toasted: true});
                alert(`What you write here will note be updated online`);
            }
            console.log("Not allowed to update this code");
        }
    }

    /**
     * Will launch a put for updating the online code
     */
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

    /**
     * Updates the Ace editor if the current user changes the text tab
     * (HTML, CSS, JS, RENDER)
     * Depending on the selectedUser value, will change the displayed text
     * As well as Ace's edition mode 
     */
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

    /**
     * Updates the Ace editor if the current user changes the user tab
     * (My space, user1, etc.)
     * Depending on the key of the new selectedUser, will change for the precedently loaded page
     * As well as Ace's edition mode 
     */
    changeUser = (tabValue) => {
        console.log(`Changed user: ${tabValue}`);
        
        // When new user, this.props.codes is bigger
        // condition is true the first time after that
        // that is why we initiate these new users
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

    /**
     * return string
     * Building the Iframe content
     * Set up a correct html page
     * And adds to it the css and js contents
     */
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

    /**
     * Look for the existing Iframe
     * Load the code content to it
     * Called after componentDidMount, then Iframe actually exists when Render tab asked
     * If state.konami = true : just makes the iframe load a webpage
     */
    makeIframe = () => {
        var source = this.buildIframeContent(this.state.selectedUser);
        
        var iframe = document.querySelector('iframe'),
            iframe_doc = iframe.contentDocument;

        if(this.state.konami){
            iframe.setAttribute("src", "https://rickrolled.fr/");
            iframe_doc.clear()
        } else {
            iframe_doc.open();
            iframe_doc.write(source);
            iframe_doc.close();    
        }
        return;
    }

    /**
     * Called when konami code done
     * Replacce state.konami to true, so Iframe ill always load a specific wab page
     */
    konamiDone = () => {
        console.log("Never gonna let you down...");
        this.setState({konami: true});
        alert("Never gonna give you up...");
    }

    render() {
        const user = this.state.users[this.state.selectedUser];
        return (
            <div className={this.props.className}>
                <ReactKonami easterEgg={this.konamiDone}/>
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
