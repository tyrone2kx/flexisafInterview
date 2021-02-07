import React from 'react'

const DogImage = (props) => {
    const image = props.image;

    return (
        <div className='imageContainer'>
            <img className='dogImage' src={image} alt='dog_image' />
        </div>
    )
}

export default DogImage
