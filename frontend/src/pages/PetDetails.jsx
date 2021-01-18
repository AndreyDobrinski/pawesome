import { petService } from "../services/petService.js";
import { Component } from 'react'
import { connect } from 'react-redux'
import { saveOrder } from '../store/actions/orderActions.js'
import { MapContainer } from "../cmps/MapContainer.jsx";
import { ReactComponent as Gender } from "../assets/imgs/sex.svg"
import { ReactComponent as Age } from "../assets/imgs/age.svg"
import { ReactComponent as Size } from "../assets/imgs/size.svg"
import { ReactComponent as Child } from "../assets/imgs/child.svg"
import { ReactComponent as Disability } from "../assets/imgs/disability.svg"
import { ReactComponent as Animals } from "../assets/imgs/animals.svg"
import { ReactComponent as Pawprint } from "../assets/imgs/pawprint.svg"
import { OrderCreator } from "../cmps/OrderCreator.jsx";




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
        const { loggedInUser } = this.props
        if (!pet) return <h2>Loading...</h2>
        return <div className="pet-details container">
            {/* <h1 className="page-signup-title">PetDetails</h1> */}
            <div className="pet-details-main-title">
                <h3>{pet.name}</h3>
                <h5>😊 {pet.likes}</h5>
                <h5>{pet.host.loc.address}</h5>
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
                            <Gender />
                            <h5>{pet.gender}</h5>
                        </div>
                        <div className="pet-char">
                            <Age />
                            <h5>{pet.age}</h5>
                        </div>
                        <div className="pet-char">
                            <Size />
                            <h5>{pet.size}</h5>
                        </div>
                        {pet.specialities && pet.specialities.map((spec, idx) => {
                            switch (spec) {
                                case 'friendly with children':
                                    var res = <Child />
                                    break
                                case 'disability support':
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
                                <h5>{spec}</h5>
                            </div>
                        })}
                    </div>
                    <p>{pet.description}</p>
                </div>
                <div className="pet-details-nav">
                    <OrderCreator pet={pet} userId={loggedInUser._id} />
                    <div className="pet-details-owner">
                        {/* <div className="pet-details-map" >
                            <MapContainer hostCreds={{ lat: pet.host.loc.lat, lng: pet.host.loc.lng }} />
                        </div> */}
                        <div className="pet-details-owner-info">
                            <h6>{pet.host.fullname}</h6>
                            <img src={pet.host.imgUrl} alt="" />
                            <h6>{pet.host.phone}</h6>
                            <h6>{pet.host.email}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pet-details-map" >
                <h3>Location</h3>
                <p>{pet.host.loc.address}</p>
                <MapContainer hostCreds={{ lat: pet.host.loc.lat, lng: pet.host.loc.lng }} />
            </div>

        </div>
    }
}

const mapGlobalStateToProps = (state) => {
    return {
        // pets: state.petModule.pets,
        currPet: state.petModule.currPet,
        loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
    saveOrder
}
export const PetDetails = connect(mapGlobalStateToProps, mapDispatchToProps)(_PetDetails)


