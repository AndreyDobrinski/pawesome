import { PetPreview } from '../cmps/PetPreview.jsx'

export function PetList({ pets }) {
    return <ul className="card-grid">
        {pets.map(pet => <PetPreview key={pet._id} pet={pet} />)}
    </ul>
}