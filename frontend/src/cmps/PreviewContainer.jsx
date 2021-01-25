import {Component} from 'react'
import { connect } from 'react-redux'

import { petService } from "../services/petService"

import {PetList} from './PetList'
import { toggleDarkMode } from '../store/actions/appSettingsActions'
import Loader from 'react-loader-spinner'



const MONTH = 30

export class _PreviewContainer extends Component {

    state = {
        pets: []
    }

    componentDidMount() {
        
       this.loadPets()
    }

    loadPets = () => {
        petService.query({}).then(pets => {
            return this.getPetsToShow(pets)
        }).then( pets =>  this.setState({ pets }) )
    }

    getPetsToShow = (pets) => {
       
        const petsToShow = pets.filter(pet => { 
            console.log(`next pet for check record date --- ${pet.name}, ${pet.recordDate}`)

            let actualDays = (new Date().getTime() - new Date(pet.recordDate).getTime()) / 1000 / 60 / 60 / 24
            console.log('actual days --- ', actualDays)
            if (this.props.daysFromNow && actualDays < +this.props.daysFromNow) return pet
            if (this.props.longerThenDays && actualDays > +this.props.longerThenDays) return pet     
        })

        return petsToShow;
    }

    getSortedPets = (pets) => {
        const sorted = pets.sort((pet1, pet2) => new Date(pet1.recordDate) - new Date(pet2.recordDate) )
        const show = pets.map(pet => { return {"name" : pet.name, "recordDate" : pet.recordDate} })
        console.log("After sort --- ",show)
        return sorted
    }

    render() {
        const {pets} = this.state
        return <div className={this.props.clsName}>
            <h1 className={`pets-preview-subject ${this.props.isDarkMode ? 'dark-mode-preview-subject' : ''}`}>{this.props.title}</h1>

            {this.props.isLoading && <div className="loader flex justify-center align-center"><Loader type="TailSpin" color="#86cb77"height={100} width={100} timeout={3000} /></div> }
            {!this.props.isLoading && <PetList pets={pets}/>}
            {/* <PetList pets={pets}/> */}
        </div>
    }
}


const mapStateToProps = state => {
    return {
      isDarkMode: state.appSettingsModule.isDarkMode,
      isLoading: state.appSettingsModule.isLoading

  
    }
  }
  const mapDispatchToProps = {
    toggleDarkMode
  }
  
  
  
  export const PreviewContainer = connect(mapStateToProps, mapDispatchToProps)(_PreviewContainer)