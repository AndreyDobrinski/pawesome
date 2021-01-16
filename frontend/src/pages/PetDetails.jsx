import { petService } from "../services/petService.js";
// import { PetReview } from '../cmps/PetReview'
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




export class _PetDetails extends Component {
    state = {
        pet: null,
        message: ''
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

    onAddOrder = (ev) => {
        ev.preventDefault()
        let { pet, message } = this.state
        var order = {
            status: "pending",
            message: message,
            pet: {
                name: pet.name,
                _id: pet._id,
                imgUrls: pet.imgUrls
            },
            // byUser: {
            //     "_id": "u101",
            //     "fullname": "User 1"
            // }
        }
        this.props.saveOrder(order)
            .then(() => { this.setState({ message: '' }) })
    }

    onInputChange = ({ target }) => {
        this.setState({ message: target.value }, () => console.log(this.state.message))
    }

    render() {
        const { pet, message } = this.state
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
                    <div className="pet-details-order">
                        <form className="add-order" onSubmit={this.onAddOrder}>
                            <textarea placeholder={`Hello! I want to adopt ${pet.name} ...`} onChange={this.onInputChange} value={message} name="order-txt" rows="8"></textarea>
                            <button className="add-order-btn btn2">Adopt {pet.name}</button>
                        </form>
                    </div>
                    <div className="pet-details-owner">
                        <div className="pet-details-map" >
                            <MapContainer hostCreds={{ lat: pet.host.loc.lat, lng: pet.host.loc.lng }} />
                        </div>
                        <div className="pet-details-owner-info">
                            <h6>{pet.host.fullname}</h6>
                            <img src={pet.host.imgUrl} alt="" />
                            <h6>{pet.host.phone}</h6>
                            <h6>{pet.host.email}</h6>
                        </div>
                    </div>
                </div>
            </div>
            {/* <img className="pet-img" src={pet.imgUrl} alt="" />
            <h3>Price: {pet.price}</h3>
            <h3>Type: {pet.type}</h3>
            <h3>{pet.inStock ? 'IN' : 'NOT IN'} stock</h3> */}
            {/* <PetReview petId={pet._id} /> */}
            {/* <button onClick={() => this.props.history.push('/pet')}>Go Back</button> */}
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


