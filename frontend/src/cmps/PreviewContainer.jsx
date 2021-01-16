export class PreviewContainer extends Component {

    state = {
        pets: []
    }

    render() {
        const {pets} = this.state
        return <div>
            <PetList pets={pets}/>
        </div>
    }
}