import {Link} from 'react-router-dom';
import { LikeButton } from './btns/LikeBtn';

export function PetPreview(props) {

    const { pet } = props
    console.log( "Pet --- ", pet )
    let imgSrc = pet.imgUrls[0]

    // onLike = () => {
        
    // }

    return <li className='pet-preview'>
               
                <Link to={`/pet/${pet._id}`} >
                    <img style={{width: "300px"}} src={imgSrc} alt="pet"/>
                </Link>
                <h1>{pet.name}</h1>
                <h2>{pet.gender}</h2>
                <p>{pet.shortDesc}</p>
                <h3>{pet.host.fullname}</h3>
                <LikeButton pet={pet}/>
                {/* <Link to={`/user?type=shelter&fullname=${pet.host.fullname}`}>{pet.host.fullname}</Link> */}
                {/* <Link to={`/pet/${pet._id}` }>Details</Link> | */}
                {/* <Link to={`/pet/edit/${pet._id}` }>Edit</Link> */}
            </li>
}