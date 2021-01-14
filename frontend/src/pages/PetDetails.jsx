import { petService } from "../services/petService.js";
// import { PetReview } from '../cmps/PetReview'
import { Component } from 'react'
import { connect } from 'react-redux'


export class _PetDetails extends Component {
    state = {
        pet: null,
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

    onAddOrder = () => {
        let {pet} = this.state
        var order = {
            status: "pending",
            pet: {
                name: pet.name,
                _id: pet._id,
                imgUrls: pet.imgUrls
            },
            "byUser": {
                "_id": "u101",
                "fullname": "User 1"
            }
        }

    }

    onInputChange = () => {

    }

    render() {
        const { pet } = this.state
        if (!pet) return <h2>Loading...</h2>
        return <div className="pet-details">
            {/* <h1 className="page-signup-title">PetDetails</h1> */}
            <div className="pet-details-imgs">
                {pet.imgUrls.map((img, idx) => {
                    // return <div className="img-container">
                    return <img src={img} alt="" key={idx} className='pet-details-img' />
                })
                }
                {/* className={`pet-details-img-${idx}`} */}
            </div>
            <div className="pet-details-main">
                <div className="pet-details-pet">
                    <div className="pet-details-title">
                        <h3>Title: {pet.name}</h3>
                        <h5>{pet.likes}😊</h5>
                    </div>
                    <div className="pet-details-info">
                        <h5>{pet.gender}</h5>
                        <h5>{pet.age}</h5>
                        <h5>{pet.size}</h5>
                        {pet.specialities && pet.specialities.map((spec, idx) => {
                            return <h5 key={idx}>{spec}</h5>
                        })}
                    </div>
                    <p>{pet.description}</p>
                </div>
                <div className="pet-details-nav">
                    <div className="pet-details-order">
                        <form className="add-order" onSubmit={this.onAddOrder}>
                            <textarea onChange={this.onInputChange} name="order-txt" rows="8"></textarea>
                            <button className="add-order-btn">Adopt {pet.name}</button>
                        </form>
                    </div>
                    <div className="pet-details-owner">
                        <div className="pet-details-map"></div>
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
export const PetDetails = connect(mapGlobalStateToProps)(_PetDetails)

