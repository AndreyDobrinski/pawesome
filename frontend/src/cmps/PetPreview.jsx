import {Link} from 'react-router-dom';
import {Component} from 'react'
import { LikeButton } from './btns/LikeBtn';

export class PetPreview extends Component {

    state = {
        pet: this.props.pet
    }
    
    componentDidMount() {
        const currPet = {...this.props.pet}
        this.setState({...this.state, currPet} )
    }

    onLike = (diff) => {
        
        const likes = (+this.state.pet.likes)+diff
        const pet = {...this.state.pet, likes}
        this.setState( {...this.state, pet} )

        // this.props.updatePetData(pet) --- TODO --- petActions.js
    }

    render() {

        const {pet} = this.state
        const imgSrc = pet.imgUrls[0]
        return (<li className="pet-preview">
                <Link to={`/pet/${pet._id}`} >
                    <div className="square-ratio">
                        <img src={imgSrc} alt="pet"/>
                    </div>
                </Link>
                <h1>{pet.name}</h1>
                <h2>{pet.gender}</h2>
                <h3>{pet.shortDesc}</h3>
                <h4>{pet.host.fullname}</h4>
                <div className="flex">
                <LikeButton liked={this.onLike}/><span>{`(${pet.likes})`}</span>
                </div>
                {/* <Link to={`/user?type=shelter&fullname=${pet.host.fullname}`}>{pet.host.fullname}</Link> */}
                {/* <Link to={`/pet/${pet._id}` }>Details</Link> | */}
                {/* <Link to={`/pet/edit/${pet._id}` }>Edit</Link> */}
            </li>)
    }
}