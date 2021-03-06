
import { Component } from 'react'
import { connect } from 'react-redux'
import { PreviewContainer } from '../cmps/PreviewContainer'
import { toggleDarkMode } from '../store/actions/appSettingsActions'


export class _Home extends Component {

  state = {

  }

  componentDidMount() {
  }


  render() {

    return (
      <div className={`page-home ${this.props.isDarkMode ? 'dark-mode-page-home' : ''}`}>
        <div className="page-home-hero">

          <video autoPlay="" loop="" muted="" playsInline="" data-loop="true" data-autopause="false" data-mute="true" data-fill-mode="fill" className="ms-slide-bgvideo" autoPlay loop muted >
            <source src="https://www.petfinder.co.il/wp-content/uploads/2019/09/petfinder.mp4" type="video/mp4" />
          </video>


          {/* <img className="ms-slide-bgvideo" src="https://images.hdqwalls.com/download/kids-and-dogs-qhd-1920x1080.jpg" alt=""/> */}
          {/* <img className="ms-slide-bgvideo" src="https://i.pinimg.com/originals/c2/e3/e1/c2e3e1b69e339c2e1b56f602ba429f24.jpg" alt=""/> */}
          {/* <img className="ms-slide-bgvideo" src="https://media4.s-nbcnews.com/i/newscms/2016_52/1185083/little-kids-big-dogs-today-161230-tease_bcd1582f4ad296838401a664f777589f.jpg" alt=""/> */}
          {/* <img className="ms-slide-bgvideo" src="https://s1.1zoom.me/b6058/448/Dogs_Svetlana_Shelemeteva_Hug_Little_girls_568770_1920x1080.jpg" alt=""/> */}

          <div className="page-home-hero-content ">
            <div className="page-home-hero-title">Find Your <br /> Pawesome Friend</div>
          </div>

        </div>

        <PreviewContainer title="Meet our new sweet girls and boys" petsToShow="new" clsName="container  pets-preview-container new-pets-preview" />
        <PreviewContainer title="They are waiting too long" petsToShow="longWaiting" clsName="container pets-preview-container long-waiting-pets-preview" />

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
