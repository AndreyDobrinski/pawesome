import { Component } from 'react'
import { ReactComponent as Facebook } from "../assets/imgs/facebook.svg"
import { ReactComponent as Instagram } from "../assets/imgs/instagram.svg"
import { ReactComponent as Twitter } from "../assets/imgs/twitter.svg"
import { ReactComponent as Paw } from "../assets/imgs/paw-black-shape.svg"




export class AppFooter extends Component {


    render() {
        return (
            <section className="app-footer  ">
                <div className="app-footer-container container flex align-center justify-between   ">

                    <div className="app-footer-logo flex">
                        <div className="app-footer-logo-img"><Paw/></div>
                        <div className="app-footer-name-pawesome"><span className="app-footer-name-paw">Paw</span>eSome</div>
                    </div>

                    <div>© 2020 HomeSeek , Inc. All rights reserved · Privacy · Terms · Sitemap</div>

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