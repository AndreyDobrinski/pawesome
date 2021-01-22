import { connect } from 'react-redux'
import { Component } from 'react'

import { toggleDarkMode } from '../store/actions/appSettingsActions'

import { ReactComponent as FacebookBlack } from "../assets/imgs/facebook-black.svg"
import { ReactComponent as FacebookWhite } from "../assets/imgs/facebook-white.svg"
import { ReactComponent as InstagramBlack } from "../assets/imgs/instagram-black.svg"
import { ReactComponent as InstagramWhite } from "../assets/imgs/instagram-white.svg"
import { ReactComponent as TwitterBlack } from "../assets/imgs/twitter-black.svg"
import { ReactComponent as TwitterWhite } from "../assets/imgs/twitter-white.svg"
import { ReactComponent as PawDark } from "../assets/imgs/paw-black-shape.svg"
import { ReactComponent as PawWhite } from "../assets/imgs/paw-white-shape.svg"






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

                    <div className="app-footer-copyright">© 2020 PawSome , Inc. All rights reserved · Privacy · Terms · Sitemap</div>

                    <div className="app-footer-social-container flex ">
                        <div className="social-facebook">{ this.props.isDarkMode? <FacebookWhite/> : <FacebookBlack/> }</div>
                        <div className="social-instagram">{ this.props.isDarkMode? <InstagramWhite/> : <InstagramBlack/> }</div>
                        <div className="social-twitter">{ this.props.isDarkMode? <TwitterWhite/> : <TwitterBlack/> }</div>
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