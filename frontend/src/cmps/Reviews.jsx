import { Component } from 'react'
import author01 from '../assets/imgs/author01.jpg'
import author02 from '../assets/imgs/author02.jpg'
import author03 from '../assets/imgs/author03.jpg'
import author04 from '../assets/imgs/author04.jpg'
import { ReactComponent as Star } from "../assets/imgs/star.svg"
import { ReactComponent as StarEmpty } from "../assets/imgs/starEmpty.svg"



export class Reviews extends Component {
    state = {
        reviews: [
            {
                author: 'Adriean',
                createdAt: 'November 2020',
                imgUrl: author01,
                // 'https://a0.muscache.com/im/pictures/user/f42b38a6-e097-458d-a0f1-3aa11025eaa3.jpg?im_w=240'
                txt: 'Great place for the animals! They take care of them with such great love, it\'s nice to know thay people like them exist.',
                mark: 5
            },
            {
                author: 'Gary',
                createdAt: 'June 2020',
                imgUrl: author02,
                // 'https://a0.muscache.com/im/pictures/user/c3bfc00a-672f-4129-8d0f-46ee0f36c975.jpg?im_w=240',
                txt: 'Wonderful atmosphere of love and care, willingness to help at any time with all attention and patience.',
                mark: 5
            },
            {
                author: 'Dinieth',
                createdAt: 'March 2020',
                imgUrl: author03,
                // 'https://a0.muscache.com/im/users/4957952/profile_pic/1412215403/original.jpg?im_w=240',
                txt: 'Great rescue! I adopted my cat Thompson from them, and I couldn’t be happier!',
                mark: 5
            },
            {
                author: 'Michael',
                createdAt: 'December 2019',
                imgUrl: author04,
                // 'https://a0.muscache.com/im/pictures/user/6b7d6402-d0c5-4636-a6d3-5cce68be6056.jpg?im_w=240',
                txt: 'Organization contacted me immediatly after I submitted an adoption request, provided with all needed medical documents and consulted me about taking care of the pet.',
                mark: 4
            },
        ]
    }

    setStars = (mark) => {
        var stars = []
        for (let i = 0; i < mark; i++) {
            stars.push(<Star/>)
        }
        if (stars.length < 5) stars.push(<StarEmpty/>)
        return stars
    }

    render() {
        var { reviews } = this.state

        return <div className="reviews-section">
            <h3>Reviews</h3>
            <div className="reviews">
                {reviews.map(review => {
                    return <div className="review">
                        <div className="review-author">
                            <div className="review-img">
                                <img src={review.imgUrl} alt="" />
                            </div>
                            <div className="review-name-mark">
                                <h4 className="author">{review.author}</h4>
                                <div className="stars">{this.setStars(review.mark)}</div>                                
                            </div>
                            <h5>{review.createdAt}</h5>
                        </div>
                        <div className="review-txt">{review.txt}</div>
                    </div>
                })}
            </div>
        </div>
    }
}

