import {Component} from 'react'
import { petService } from "../services/petService"

import {PetList} from './PetList'

const MONTH = 30

export class PreviewContainer extends Component {

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
            <h1>{this.props.title}</h1>
            <PetList pets={pets}/>
        </div>
    }
}