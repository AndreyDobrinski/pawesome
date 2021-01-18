import { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout, signup, removeUser, loadUsers } from '../store/actions/userActions'
import { ReactComponent as Paw } from "../assets/imgs/paw-black-shape.svg"
import { ReactComponent as Search } from "../assets/imgs/magnifying-glass.svg"
import { ReactComponent as User } from "../assets/imgs/user.svg"



import {SearchFilterBar} from './SearchFilterBar'



import Container from '@material-ui/core/Container';
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
        },
        isScrolled: false,
        isHomePage: false,
        smallSearchClicked: true,
        isDarkMode: false

    }



    componentDidMount() {
        this.props.loadUsers()
        window.addEventListener('scroll', this.handleScroll)
        // console.log('Looking for routes', this);
        if (this.isHomePage()) {
            this.setState({
                isHomePage: true,
            })
        }

    }

    componentDidUpdate(prevProps) {
        // console.log('prevProps.match:',prevProps.location);
        // console.log('this.props.match:',this.props.location);

        if (prevProps.location.pathname !== this.props.location.pathname) {
            if (this.isHomePage()) {
                this.setState({
                    isHomePage: true,
                })
            } else {
                this.setState({
                    isHomePage: false,
                })
            }
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }


    isHomePage = () => {
        return this.props.location.pathname === '/'
    }

    handleScroll = () => {
        if (window.pageYOffset === 0 && this.isHomePage()) {
            // console.log('test',window.pageYOffset);
            this.setState({
                isScrolled: false,
                smallSearchClicked:true
            })
        } else {
            this.setState({
                isScrolled: true,
                smallSearchClicked:false

            })
        }
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
            },
            modalSignClicked:false
        })
        // this.onCloseSignModal()

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
        if(this.props.loggedInUser) return
        this.setState({
            modalSignClicked: true
        })

    }

    onCloseSignModal = () => {
        this.setState({
            modalSignClicked: false
        })

    }

    onOpenBigSearch = () => {
        this.setState({
            smallSearchClicked: true
        })

    }


    setMode = () =>{
        if(this.state.isDarkMode === false){
            this.setState({
                isDarkMode: true
            })
        }else{
            this.setState({
                isDarkMode: false
            })
            
        }
    }




    render() {



        let signupSection = (

            <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                <span className="close" onClick={() => this.onCloseSignModal()}>&times;</span>

                <Container component="main" maxWidth="xs" >
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar style={{ margin: '10px', backgroundColor: '#86cb77', }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5" className="modal-header">
                            Sign up
                        </Typography>

                        <div className="modal-body-signup">

                            <form onSubmit={this.doSignup} style={{ width: '100%', marginTop: '5px' }} noValidate>

                                <TextField variant="outlined" margin="normal" value={this.state.signupCred.username} required
                                    onChange={this.signupHandleChange} fullWidth label="Username" name="username" autoFocus />

                                <TextField variant="outlined" margin="normal" value={this.state.signupCred.fullname} required
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
            <div className="modal-content" onClick={(ev) => ev.stopPropagation()} >

                <span className="close" onClick={() => this.onCloseSignModal()}>&times;</span>

                <Container component="main" maxWidth="xs" >
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                        <Avatar style={{ margin: '10px', backgroundColor: '#86cb77', }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h2" variant="h5" className="modal-header">
                            Log in
                        </Typography>

                        <div className="modal-body-login">

                            <form onSubmit={this.doLogin} style={{ width: '100%', marginTop: '5px' }} noValidate>

                                <TextField variant="outlined" margin="normal" value={this.state.loginCred.username} required
                                    onChange={this.loginHandleChange} fullWidth label="Username" name="username" autoFocus />

                                <TextField variant="outlined" margin="normal" required fullWidth value={this.state.loginCred.password}
                                    onChange={this.loginHandleChange} name="password" label="Password" type="password" autoComplete="current-password" />

                                <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '30px' }}>
                                    Log In
                      </Button>

                                <Grid container>
                                    <Grid item>
                                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '30px' }} onClick={this.newUser}>
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
            // <nav className="app-header-container ">
            // <nav className={!this.state.isScrolled && "app-header-container" } {this.state.isScrolled && "app-header-container-scrolled" }>
            // <nav className={`app-header-container${this.state.isScrolled ? '-scrolled' : ''}`}>
            <nav className={`app-header-container${this.state.isScrolled ? '-scrolled' : ''} ${this.state.isHomePage ? ' header-for-home' : ''} ${this.state.isDarkMode && this.state.isScrolled ? 'dark-mode-header-container' : ''} `}>

                <div className="app-header-content flex align-center justify-between container">

                    <Link to="/">
                        <div className="app-header-logo flex">

                            <div className="app-header-logo-img"><Paw/></div>
                            <div className={`app-header-name-pawesome ${this.state.isDarkMode? 'dark-mode-name-pawesome' : ''} `}><span className="app-header-name-paw">Paw</span>eSome</div>

                        </div>
                    </Link>

                     {/*/////////////////////////////Search Filter buttom////////////////////////////////////////////// */}
             

                     <div className={`app-header-filter-container-small flex ${this.state.smallSearchClicked ? 'hide-small-search' : ''} ${this.state.isDarkMode? 'dark-mode-small-search' : ''}`} onClick={this.onOpenBigSearch}>
                        <div className="app-header-filte-box-small flex">
                            <div className="app-header-filte-box-search-small flex column">
                                <span className="small-search-title">Start your search</span>
                            </div>
                        </div>

                        <div className="app-header-filte-box-Search flex justify-center align-center ">
                            <button className="search-btn btn1"><Search/></button>
                        </div>
                    </div>
                    {/*/////////////////////////////Search Filter buttom////////////////////////////////////////////// */}



                    <div className="app-header-link-container flex">

                        <Link to="/pet"><div className={`app-header-link-pets ${this.state.isDarkMode? 'dark-mode-link-pets' : ''}`}>Pets</div></Link>
                        <div className="app-header-link-login" onClick={this.onOpenSignModal}>
                            {!loggedInUser && <User/>}
                            {loggedInUser && <Link to={`/profile/${loggedInUser._id}`}>Welcome {loggedInUser.fullname}</Link> }
                            {/* {loggedInUser && `Welcome ${loggedInUser.fullname}`} */}
                        </div>
                        <div className="app-header-mode" onClick={this.setMode}>{this.state.isDarkMode? 'Dark':'Light'}</div>

                    </div>


                </div>

                {/*/////////////////////////////Search Filter buttom////////////////////////////////////////////// */}

                {this.state.smallSearchClicked && <div className={`${this.state.isHomePage ? 'app-header-filter-home ' : 'app-header-filter-normal '}
                 flex align-center justify-center ${this.state.isScrolled ? 'filter-scrolled' : ''}`}>
                    <SearchFilterBar />
                </div>}
                {/*/////////////////////////////Search Filter buttom////////////////////////////////////////////// */}



                {this.state.modalSignClicked && <div className="modal" onClick={() => this.onCloseSignModal()}>

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



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))

