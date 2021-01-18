
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { PreviewContainer } from '../cmps/PreviewContainer'


export class _Home extends Component {

  state = {


  }


  componentDidMount() {

    console.log('HOME LOC---', this.props.location)
  }



  render() {

    return (
      <div>

        <div className="page-home-hero">


          <video autoPlay="" loop="" muted="" playsInline="" data-loop="true" data-autopause="false" data-mute="true" data-fill-mode="fill" className="ms-slide-bgvideo" autoPlay loop>
            <source src="https://www.petfinder.co.il/wp-content/uploads/2019/09/petfinder.mp4" type="video/mp4" />
          </video>


          <div className="page-home-hero-content ">
            <div>Find your furry best friend</div>
            <Link to="/pet"><button className="btn2">Go to pets</button></Link>
          </div>

        </div>




        {/* <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
        </div> */}
        <PreviewContainer title="Meet our new sweet girls and boys" daysFromNow="2" clsName="container  pets-preview-container new-pets-preview" />


        {/* <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
        </div> */}

        <PreviewContainer title="They are waiting too long" longerThenDays="30" clsName="container pets-preview-container long-waiting-pets-preview" />

        <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
        </div>


        <div className="plan-adopt ">

          <div className="plan-adopt-header container">
            <div className="plan-adopt-header-inner">
              <h2 className="plan-adopt-header-txt text-center">Planning to Adopt a Pet?</h2>
            </div>
          </div>

          <div className="plan-adopt-body container flex justify-between">

            <div className="plan-adopt-body-box1">
              <h2 className="plan-adopt-body-header1 text-center">Checklist for New Adopters</h2>
              <p className="plan-adopt-body-txt1 text-center">Help make the transition, as smooth as possible.</p>
              <div className=" flex justify-center align-center ">
                <button className="learn-more-btn" >Learn More</button>
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
                <button className="learn-more-btn" >Learn More</button>
              </div>
            </div>

            <div className="plan-adopt-body-box3">
              <h2 className="plan-adopt-body-header3 text-center">Pet Adoption FAQs</h2>
              <p className="plan-adopt-body-txt3 text-center">Get answers to questions you haven't thought of.</p>
              <div className=" flex justify-center align-center ">
                <button className="learn-more-btn" >Learn More</button>
              </div>
            </div>

            {/* <div className="plan-adopt-body-header2">COVID-19 Resources</div> */}
            {/* <div className="plan-adopt-body-header3">Pet Adoption FAQs</div> */}

          </div>

        </div>


      </div>
    )
  }
}




const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = {

}



export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
