
import {Link, withRouter} from 'react-router-dom'



 function _AppHeader(){
    return(
        <nav className="appHeader-nav">
            <Link to="/">Home</Link>
            <Link to="/pet">Pet</Link>
            <Link to="/signup">Signup</Link>
        </nav>
    )
}


export const AppHeader = withRouter(_AppHeader)