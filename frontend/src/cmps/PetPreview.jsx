import { Link } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { LikeButton } from './btns/LikeBtn'

import { savePet } from '../store/actions/petActions'
import { toggleDarkMode } from '../store/actions/appSettingsActions'

import { ReactComponent as Female } from "../assets/imgs/femenine.svg"
import { ReactComponent as Male } from "../assets/imgs/male.svg"


export class _PetPreview extends Component {

    state = {
        pet: this.props.pet
    }

    componentDidMount() {
        const currPet = { ...this.props.pet }
        this.setState({ ...this.state, currPet })
    }

    onLike = (diff) => {

        const likes = (+this.state.pet.likes) + diff
        const pet = { ...this.state.pet, likes }
        this.setState({ ...this.state, pet })

        this.props.savePet(pet)
    }

    render() {

        const { pet } = this.state
        const imgSrc = pet.imgUrls[0]
        const gender = this.state.pet.gender === 'female'? <Female/>: <Male/>

        return (<li className="pet-preview">
            <Link to={`/pet/${pet._id}`} >
                <div className="square-ratio">
                    <img src={imgSrc} alt="pet" />
                </div>
            </Link>
            <div className="flex">
                <h2 className={`pet-preview-pet-name flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-name' : ''}`}>{pet.name}</h2>
                <h2 className="pet-preview-pet-gender flex justify-center align-center">{gender}</h2>
            </div>
            {/* <h2>{pet.name} {gender}</h2> */}
            <p className={`${this.props.isDarkMode ? 'dark-mode-pet-short-desc' : ''}`}>{pet.shortDesc}</p>
            <div className="pet-preview-host-and-likes flex justify-between">
                <h4 className={`pet-preview-host flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-host' : ''}`}>{pet.host.fullname}</h4>
                <div className="pet-preview-likes flex">
                    <LikeButton liked={this.onLike} /><span className={`pet-preview-likes-amount flex justify-center align-center ${this.props.isDarkMode ? 'dark-mode-pet-likes-amount' : ''}`}>{`${pet.likes}`}</span>
                </div>

            </div>
            {/* <Link to={`/user?type=shelter&fullname=${pet.host.fullname}`}>{pet.host.fullname}</Link> */}
            {/* <Link to={`/pet/${pet._id}` }>Details</Link> | */}
            {/* <Link to={`/pet/edit/${pet._id}` }>Edit</Link> */}
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