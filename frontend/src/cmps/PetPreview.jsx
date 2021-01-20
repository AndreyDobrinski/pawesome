import { Component } from 'react'
import { connect } from 'react-redux'
import { LikeButton } from './btns/LikeBtn'

import { savePet } from '../store/actions/petActions'
import { toggleDarkMode } from '../store/actions/appSettingsActions'

import { ReactComponent as Female } from "../assets/imgs/femenine.svg"
import { ReactComponent as Male } from "../assets/imgs/male.svg"

import { CarouselComponent} from './CarouselComponent'


export class _PetPreview extends Component {

    state = {
        pet: null
    }

    componentDidMount() {
        const pet = { ...this.props.pet }
        this.setState({ ...this.state, pet })
    }

    onLike = (diff) => {

        const likes = (+this.state.pet.likes) + diff
        const pet = { ...this.state.pet, likes }
        this.setState({ ...this.state, pet })

        this.props.savePet(pet)
    }

    render() {

        const { pet } = this.state

        if (!pet) return <div>Loading...</div>

        // const imgSrc = pet.imgUrls[0]
        const gender = this.state.pet.gender === 'female'? <Female/>: <Male/>

        return (<li className="pet-preview">
           
            <CarouselComponent pet={pet}/>
            <div className="flex">
                <h2 className={`pet-preview-pet-name flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-name' : ''}`}>{pet.name}</h2>
                <h2 className="pet-preview-pet-gender flex justify-center align-center">{gender}</h2>
            </div>
            <p className={`${this.props.isDarkMode ? 'dark-mode-pet-short-desc' : ''}`}>{pet.shortDesc}</p>
            <div className="pet-preview-host-and-likes flex justify-between">
                <h4 className={`pet-preview-host flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-host' : ''}`}>{pet.host.fullname}</h4>
                <div className="pet-preview-likes flex">
                    <LikeButton liked={this.onLike} /><span className={`pet-preview-likes-amount flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-likes-amount' : ''}`}>{`${pet.likes}`}</span>
                </div>

            </div>
        </li>)
    }
}

const mapStateToProps = (state) => {
    return {
        pets: state.petModule.pets,
        isDarkMode: state.appSettingsModule.isDarkMode

    }
}

const mapDispatchToProps = {
    savePet,
    toggleDarkMode
}

export const PetPreview = connect(mapStateToProps, mapDispatchToProps)(_PetPreview)