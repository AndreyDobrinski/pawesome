
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


export class _Home extends Component {

  state = {

  }


  componentDidMount() {

  }


  render() {
    return (
      <div>

        <div className="page-home-hero">


          <video autoPlay="" loop="" muted="" playsInline="" data-loop="true" data-autopause="false" data-mute="true" data-fill-mode="fill" className="ms-slide-bgvideo" autoPlay loop>
            <source src="https://www.petfinder.co.il/wp-content/uploads/2019/09/petfinder.mp4" type="video/mp4" />
          </video>

          <div className="page-home-hero-content">
            Find your furry best friend.
            <Link to="/pet"><button>Go to pets</button></Link>  
          </div>




        </div>

        <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
        </div>


        <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
        </div>


        <div className="text-test container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque porro consequuntur a asperiores inventore cupiditate? Dignissimos nemo hic, sint magni sequi consequuntur tenetur repellendus placeat libero quasi quaerat perferendis culpa.
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
