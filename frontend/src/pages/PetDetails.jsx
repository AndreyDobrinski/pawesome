import { petService } from "../services/petService.js";
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder } from '../store/actions/orderActions.js'
import { MapContainer } from "../cmps/MapContainer.jsx";
import { ReactComponent as HeartFull } from "../assets/imgs/heart-full.svg"
import { ReactComponent as Female } from "../assets/imgs/female.svg"
import { ReactComponent as Male } from "../assets/imgs/male.svg"
import { ReactComponent as Age } from "../assets/imgs/age.svg"
import { ReactComponent as Size } from "../assets/imgs/size.svg"
import { ReactComponent as Child } from "../assets/imgs/child.svg"
import { ReactComponent as Disability } from "../assets/imgs/disability.svg"
import { ReactComponent as Animals } from "../assets/imgs/animals.svg"
import { ReactComponent as Pawprint } from "../assets/imgs/pawprint.svg"
import { ReactComponent as Whatsapp } from "../assets/imgs/whatsapp.svg"
import { OrderAdd } from "../cmps/OrderAdd.jsx";
import { Reviews } from "../cmps/Reviews.jsx";




export class _PetDetails extends Component {
    state = {
        pet: null
    };

    componentDidMount() {
        const { petId } = this.props.match.params;
        this.loadPet(petId)
    }

    loadPet = async (petId) => {
        try {
            const pet = await petService.getById(petId)
            return this.setState({ pet })
        } catch (err) {
            console.log('Error catched in fronf2', err)
        }
        // var pet = this.props.pets.find(pet => pet._id = petId)
        // this.setState({ pet })
    }



    render() {
        const { pet } = this.state
        if (!pet) return <h2>Loading...</h2>
        return <div className="pet-details container">
            {/* <h1 className="page-signup-title">PetDetails</h1> */}
            <div className="pet-details-main-title">
                <h2>{pet.name}</h2>
                <div className="pet-details-block flex center">
                    <div className="pet-details-statstics flex">
                        <HeartFull />
                        <h5>{pet.likes}</h5>
                    </div>
                    <h5>·</h5>
                    <h5>{pet.host.fullname}</h5>
                </div>
            </div>
            <div className="pet-details-imgs">
                {pet.imgUrls.map((img, idx) => {
                    return <img src={img} alt="" key={idx} className='pet-details-img' />
                })
                }
            </div>
            <div className="pet-details-main">
                <div className="pet-details-pet">
                    <div className="pet-details-title">
                        <h3>{pet.shortDesc}</h3>
                    </div>
                    <div className="pet-details-info">
                        <div className="pet-char">
                            {pet.gender === 'female' ? <Female /> : <Male />}
                            <h4>{pet.gender}</h4>
                        </div>
                        <div className="pet-char">
                            <Age />
                            <h4>{pet.age}</h4>
                        </div>
                        <div className="pet-char">
                            <Size />
                            <h4>{pet.size}</h4>
                        </div>
                        {pet.specialities && pet.specialities.map((spec, idx) => {
                            switch (spec) {
                                case 'friendly with children':
                                    var res = <Child />
                                    break
                                case 'trained as service animal':
                                    var res = <Disability />
                                    break
                                case 'friendly with other animals':
                                    var res = <Animals />
                                    break
                                default:
                                    res = <Pawprint />
                                    break
                            }
                            return <div key={idx} className="pet-char">
                                {res}
                                <h4>{spec}</h4>
                            </div>
                        })}
                    </div>
                    <div className="pet-details-about">
                        <h3>{pet.name}'s story</h3>
                        <p>{pet.description}</p>
                    </div>
                </div>
                <div className="pet-details-nav">
                    <OrderAdd pet={pet} />
                </div>
            </div>

            <Reviews />

            <div className="pet-details-map" >
                <h3>Location</h3>
                <p>{pet.host.loc.address}</p>
                <div className="map-contact flex">
                    <Whatsapp />
                    <p>{pet.host.phone}</p>
                </div>
                <MapContainer hostCreds={{ lat: pet.host.loc.lat, lng: pet.host.loc.lng }} />
            </div>

        </div>
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        // pets: state.petModule.pets,
        currPet: state.petModule.currPet,
    }
}

const mapDispatchToProps = {
    saveOrder
}
export const PetDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_PetDetails)


