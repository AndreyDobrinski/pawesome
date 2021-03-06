import { Component } from 'react'
import { connect } from 'react-redux'
import author01 from '../assets/imgs/author01.jpg'
import author02 from '../assets/imgs/author02.jpg'
import author03 from '../assets/imgs/author03.jpg'
import author04 from '../assets/imgs/author04.jpg'
import { toggleDarkMode } from '../store/actions/appSettingsActions'
import { ReactComponent as StarYellow } from "../assets/imgs/star-yellow.svg"
import { ReactComponent as StarOrange } from "../assets/imgs/star-orange.svg"
import { ReactComponent as StarEmpty } from "../assets/imgs/starEmpty.svg"



export class _Reviews extends Component {
    state = {
        reviews: [
            {
                author: 'Adriean',
                createdAt: 'November 2020',
                imgUrl: author01,
                txt: 'Great place for the animals! They take care of them with such great love, it\'s nice to know thay people like them exist.',
                mark: 5
            },
            {
                author: 'Gary',
                createdAt: 'June 2020',
                imgUrl: author02,
                txt: 'Wonderful atmosphere of love and care, willingness to help at any time with all attention and patience.',
                mark: 5
            },
            {
                author: 'Dinieth',
                createdAt: 'March 2020',
                imgUrl: author03,
                txt: 'Great rescue! I adopted my cat Thompson from them, and I couldn’t be happier!',
                mark: 5
            },
            {
                author: 'Michael',
                createdAt: 'December 2019',
                imgUrl: author04,
                txt: 'Organization contacted me immediatly after I submitted an adoption request, provided with all needed medical documents and consulted me about taking care of the pet.',
                mark: 4
            },
        ]
    }

    setStars = (mark) => {
        var stars = []
        for (let i = 0; i < mark; i++) {
            stars.push(this.props.isDarkMode ? <StarYellow /> : <StarOrange />)
        }
        if (stars.length < 5) stars.push(<StarEmpty />)
        return stars
    }

    render() {
        var { reviews } = this.state

        return <div className="reviews-section">
            <h3 className={`reviews-section-title ${this.props.isDarkMode ? 'dark-mode-reviews-section-title' : ''} `}>Reviews about owner</h3>
            <div className="reviews">
                {reviews.map((review, idx) => {
                    return <div className="review" key={idx}>
                        <div className="review-author">
                            <div className="review-img">
                                <img src={review.imgUrl} alt="" />
                            </div>
                            <div className="review-name-mark">
                                <h4 className={`author ${this.props.isDarkMode ? 'dark-mode-author' : ''}`}>{review.author}</h4>
                                <div className="stars">{this.setStars(review.mark)}</div>
                            </div>
                            <h5>{review.createdAt}</h5>
                        </div>
                        <div className={`review-txt ${this.props.isDarkMode ? 'dark-mode-review-txt' : ''}`}>{review.txt}</div>
                    </div>
                })}
            </div>
        </div>
    }
}


const mapGlobalStateToProps = (state) => {
    return {
        isDarkMode: state.appSettingsModule.isDarkMode

    }
}

const mapDispatchToProps = {
    toggleDarkMode

}
export const Reviews = connect(mapGlobalStateToProps, mapDispatchToProps)(_Reviews)