import {PetPreview} from '../cmps/PetPreview.jsx'

export function PetList({pets}) {

    console.log("Pets --- ", pets)
    return <div className="pet-list">
                <ul>{ pets.map(pet => <PetPreview key={ pet._id } pet={ pet }/>) }  </ul>
            </div>
    
}