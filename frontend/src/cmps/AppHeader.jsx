import { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout, signup, removeUser, loadUsers } from '../store/actions/userActions'





import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';




export class _AppHeader extends Component {


    state = {
        isNewUser: false,
        msg: '',
        modalSignClicked: false,
        loginCred: {
            username: '',
            password: ''
        },
        signupCred: {
            username: '',
            password: '',
            fullname: ''
        }
    }


    componentDidMount() {
        this.props.loadUsers()

    }


    doSignup = async (ev) => {
        ev.preventDefault()
        const { username, password, fullname } = this.state.signupCred
        if (!username || !password || !fullname) {
            return this.setState({ msg: 'All inputs are required' })
        }
        const signupCreds = { username, password, fullname }
        this.props.signup(signupCreds)
        this.setState({
            signupCred: {
                username: '',
                password: '',
                fullname: ''
            }
        })

    }


    signupHandleChange = (ev) => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))


    }


    doLogin = async (ev) => {
        ev.preventDefault()

        const { username, password } = this.state.loginCred
        if (!username) {
            return this.setState({ msg: 'Please enter user/password' })
        }

        const userCreds = { username, password }

        try {
            this.props.login(userCreds)
            this.setState({
                loginCred: {
                    username: '',
                    password: ''
                }
            })
        } catch (err) {
            this.setState({ msg: 'Login failed, try again.' })
        }

    }


    loginHandleChange = (ev) => {
        const { name, value } = ev.target

        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }))

    }


    newUser = (ev) => {
        ev.preventDefault()
        const lastAns = this.state.isNewUser
        this.setState({ isNewUser: !lastAns })
    }




    onOpenSignModal = () => {
        this.setState({
            modalSignClicked: true
        })

    }

    onCloseSignModal = () => {
        this.setState({
            modalSignClicked: false
        })

    }




    render() {



        let signupSection = (
            <div className="modal-content">
                <span className="close" onClick={() => this.onCloseSignModal()}>&times;</span>

                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar style={{ margin: '10px', backgroundColor: 'blue', }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Sign up
                </Typography>

                        <div className="modal-body">

                            <form onSubmit={this.doSignup} style={{ width: '100%', marginTop: '5px' }} noValidate>

                                <TextField variant="filled" margin="normal" value={this.state.signupCred.username} required
                                    onChange={this.signupHandleChange} fullWidth label="Username" name="username" autoFocus />

                                <TextField variant="filled" margin="normal" value={this.state.signupCred.fullname} required
                                    onChange={this.signupHandleChange} fullWidth label="Fullname" name="fullname" />

                                <TextField variant="outlined" margin="normal" required fullWidth value={this.state.signupCred.password}
                                    onChange={this.signupHandleChange} name="password" label="Password" type="password" autoComplete="current-password" />

                                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                    Sign In
                      </Button>

                                <Grid container>
                                    <Grid item>
                                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={this.newUser}>
                                            {"Have a user? login!"}
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>

                        </div>

                    </div>

                </Container>

            </div>

        )


        let loginSection = (
            <div className="modal-content" >

                <span className="close" onClick={() => this.onCloseSignModal()}>&times;</span>

                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                        <Avatar style={{ margin: '10px', backgroundColor: 'blue', }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5">
                            Log in
                </Typography>

                        <div className="modal-body">

                            <form onSubmit={this.doLogin} style={{ width: '100%', marginTop: '5px' }} noValidate>

                                <TextField variant="filled" margin="normal" value={this.state.loginCred.username} required
                                    onChange={this.loginHandleChange} fullWidth label="Username" name="username" autoFocus />

                                <TextField variant="outlined" margin="normal" required fullWidth value={this.state.loginCred.password}
                                    onChange={this.loginHandleChange} name="password" label="Password" type="password" autoComplete="current-password" />

                                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                    Log In
                      </Button>

                                <Grid container>
                                    <Grid item>
                                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={this.newUser}>
                                            {"Don't have an account? Sign Up"}
                                        </Button>
                                    </Grid>
                                </Grid>

                            </form>

                        </div>

                    </div>

                </Container >

            </div>

        )

        const { loggedInUser } = this.props
        const { isNewUser } = this.state

        return (
            <nav className="appHeader-container ">
                <div className="appHeader-content flex align-center justify-between container">

                    <Link to="/">
                        <div className="appHeader-logo flex">

                            <div className="appHeader-logo-img">&</div>
                            <div><span className="appHeader-name-paw">Paw</span>eSome</div>

                        </div>
                    </Link>

                    <div>Search</div>

                    <div className="appHeader-link-container flex">

                        <Link to="/pet"><div className="appHeader-link-pets">Pets</div></Link>
                        <div className="appHeader-link-login" onClick={this.onOpenSignModal}>
                            {!loggedInUser && "Signup"}
                            {loggedInUser && `Welcome ${loggedInUser.name}`}
                            </div>

                    </div>


                </div>


                {this.state.modalSignClicked && <div className="modal"  >

                    {!loggedInUser && !isNewUser && loginSection}
                    {!loggedInUser && isNewUser && signupSection}

                </div>
                }
            </nav>
        )

    }
}


const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    login,
    logout,
    signup,
    removeUser,
    loadUsers
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)

