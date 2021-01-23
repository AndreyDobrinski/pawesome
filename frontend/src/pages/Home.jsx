
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { PreviewContainer } from '../cmps/PreviewContainer'
import { toggleDarkMode } from '../store/actions/appSettingsActions'



export class _Home extends Component {

  state = {


  }


  componentDidMount() {

    console.log('HOME LOC---', this.props.location)
  }



  render() {

    return (
      <div className={`page-home ${this.props.isDarkMode ? 'dark-mode-page-home' : ''}`}>

        <div className="page-home-hero">


          <video  autoPlay="" loop="" muted="" playsInline="" data-loop="true" data-autopause="false" data-mute="true" data-fill-mode="fill" className="ms-slide-bgvideo" autoPlay loop>
            <source src="https://www.petfinder.co.il/wp-content/uploads/2019/09/petfinder.mp4" type="video/mp4" />
          </video>


          <div className="page-home-hero-content ">
            <div className="page-home-hero-title">Find your <br/> Pawesome friend</div>
          </div>

        </div>



        {/* <div className="page-home-please-adopt">
          <img src="https://www.humanesociety.org/sites/default/files/styles/2000x850/public/2018/08/dog-girl-440625.jpg?h=558430af&itok=R-RS3S6N" alt="" />
          <div>
            <h1 className="page-home-adopt-circle flex align-center justify-center text-center">Why Should I Adopt?</h1>
            <div className="adopt-reasons container flex justify-between">
              <ul className="adopt-reasons-box1">
                <li>Because you'll save a life.</li>
                <li>Because you'll get a great animal.</li>
                <li>Because it’ll cost you less.</li>
                <li>Because of the bragging rights.</li>
                <li>Because it's one way to fight puppy mills.</li>
              </ul>
              <ul className="adopt-reasons-box2">
                <li>Because your home will thank you.</li>
                <li>Because all pets are good for your health, but adoptees offer an extra boost.</li>
                <li>Because adoption helps more than just one animal.</li>
                <li>Because The Shelter Pet Project makes it easy.</li>
                <li>Because you'll change a homeless animal's whole world.</li>
              </ul>

            </div>

          </div>
        </div> */}



        <PreviewContainer title="Meet our new sweet girls and boys" daysFromNow="30" clsName="container  pets-preview-container new-pets-preview" />



        <PreviewContainer title="They are waiting too long" longerThenDays="30" clsName="container pets-preview-container long-waiting-pets-preview" />

        




        <div className={`plan-adopt ${this.props.isDarkMode ? 'dark-mode-plan-adopt' : ''} `}>

          <div className="plan-adopt-header container">
            <div className="plan-adopt-header-inner">
              <h2 className={`plan-adopt-header-txt text-center ${this.props.isDarkMode ? 'dark-mode-plan-adopt-header' : ''}`}>Planning to Adopt a Pet?</h2>
            </div>
          </div>

          <div className="plan-adopt-body container flex justify-between">

            <div className="plan-adopt-body-box1">
              <h2 className="plan-adopt-body-header1 text-center">Checklist for New Adopters</h2>
              <p className="plan-adopt-body-txt1 text-center">Help make the transition, as smooth as possible.</p>
              <div className=" flex justify-center align-center ">
                <button className={`learn-more-btn ${this.props.isDarkMode ? 'dark-mode-plan-adopt-btn' : ''}`} >Learn More</button>
              </div>
            </div>

            <div className="plan-adopt-body-box2">
              <h2 className="plan-adopt-body-header2 text-center">COVID-19 Resources</h2>
              <div className="plan-adopt-body-txt2-holder">
                <p className="plan-adopt-body-txt2 text-center">Get the latest on adoption processes, learn how </p>
                <p className="plan-adopt-body-txt2 text-center">local shelters and rescue groups are adapting </p>
                <p className="plan-adopt-body-txt2 text-center">and find out what you can do to help dogs and cats in need right now.</p>
              </div>
              <div className=" flex justify-center align-center ">
                <button className={`learn-more-btn ${this.props.isDarkMode ? 'dark-mode-plan-adopt-btn' : ''}`}>Learn More</button>
              </div>
            </div>

            <div className="plan-adopt-body-box3">
              <h2 className="plan-adopt-body-header3 text-center">Pet Adoption FAQs</h2>
              <p className="plan-adopt-body-txt3 text-center">Get answers to questions you haven't thought of.</p>
              <div className=" flex justify-center align-center ">
                <button className={`learn-more-btn ${this.props.isDarkMode ? 'dark-mode-plan-adopt-btn' : ''}`}>Learn More</button>
              </div>
            </div>

          </div>

        </div>


      </div>
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



export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
