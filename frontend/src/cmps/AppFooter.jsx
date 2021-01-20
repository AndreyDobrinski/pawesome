import { Component } from 'react'
import { ReactComponent as Facebook } from "../assets/imgs/facebook.svg"
import { ReactComponent as Instagram } from "../assets/imgs/instagram.svg"
import { ReactComponent as Twitter } from "../assets/imgs/twitter.svg"
import { ReactComponent as PawDark } from "../assets/imgs/paw-black-shape.svg"
import { ReactComponent as PawWhite } from "../assets/imgs/paw-white-shape.svg"
import { toggleDarkMode } from '../store/actions/appSettingsActions'
import { connect } from 'react-redux'






export class _AppFooter extends Component {


    render() {
        return (
            <section className={`app-footer ${this.props.isDarkMode? 'dark-mode-footer':''}`}>
                <div className="app-footer-container container flex align-center justify-between   ">

                    <div className="app-footer-logo flex">
                        {/* <div className="app-footer-logo-img"><PawDark/></div> */}
                        <div className="app-footer-logo-img">{this.props.isDarkMode?<PawWhite/>:<PawDark/>}</div>
                        <div className="app-footer-name-pawesome"><span className="app-footer-name-paw">Paw</span>eSome</div>
                    </div>

                    <div>© 2020 PawSome , Inc. All rights reserved · Privacy · Terms · Sitemap</div>

                    <div className="app-footer-social-container flex ">
                        <div className="social-facebook"><Facebook /></div>
                        <div className="social-instagram"><Instagram/></div>
                        <div className="social-twitter"><Twitter/></div>
                    </div>
                </div>


            </section>
        )
    }


}


const mapStateToProps = state => {
    return {
        isDarkMode: state.appSettingsModule.isDarkMode
    }
}
const mapDispatchToProps = {
    toggleDarkMode
}



export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)