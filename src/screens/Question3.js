import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { hideSiteModal, setError, setSuccess, showSiteModal, startLoading, stopLoading } from '../actions/site';
import { Icon } from 'react-icons-kit';
import { ic_chevron_right } from 'react-icons-kit/md/ic_chevron_right'
import Header from '../components/Header'
import axios from 'axios';
import DogImage from '../components/DogImage';

const Question3 = (props) => {

    const [openMenu, setOpenMenu] = useState(false);

    const [activeMenu, setActiveMenu] = useState('')
    const [images, setImages] = useState([]);
    const [breeds, setBreeds] = useState({});



    // FETCH IMAGES OF A SELECTED BREED

    const fetchBreedImages = (breed) => {
        setActiveMenu(breed);

        // Close the menu on mobile
        setOpenMenu(false);

        // Display the Loader Modal
        props.showSiteModal();
        props.startLoading();

        axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(response => {
            props.stopLoading();
            const ref = response.data;
            if (ref.status === 'error') {
                // Display the error message on Error
                props.setError(ref.message)
            }
            else {
                setImages(ref.message)
                props.hideSiteModal()
            }
        }).catch(e => {
            props.stopLoading()
            props.setError(e.message)
        })
    }



    // FETCH ALL BREEDS

    const fetchBreed = () => {
        props.showSiteModal();
        props.startLoading();
        axios.get('https://dog.ceo/api/breeds/list/all').then(response => {
            props.stopLoading();
            const ref = response.data;
            if (ref.status === 'error') {
                props.setError(ref.message)
            }
            else {
                setBreeds(ref.message);

                // Fetch the images of the first breed on the list to display to the users.

                const defaultBreed = Object.keys(ref.message)[0];
                setActiveMenu(defaultBreed);
                fetchBreedImages(defaultBreed)
            }
        }).catch(e => {
            props.stopLoading()
            props.setError(e.message)
        })
    }


    

    // Fetch dog breeds once on page load
    useEffect(() => {
        fetchBreed();
    }, []);



    return (
        <>
            <Header />
            <div className='page_body'>
                <div className='page_container_70'>
                    <div className='page_inner'>
                        <div className='question_container'>
                            <p>3.{')'} Implement an interface that allows a user to select a breed 
                            from a list and then, show the userimages of dogs that fall under that breed.</p>
                        </div>
                        <div className='show_on_mobile mobile_category_display_container'>
                            <div className='mobile_cat_selector' onClick={() => setOpenMenu(!openMenu)}>
                                <div>
                                    <p>{activeMenu}</p>
                                </div>
                                <Icon size={24} icon={ic_chevron_right} />
                            </div>
                            {openMenu &&
                                <>
                                    {Object.keys(breeds).map((breed, index) => (
                                        <div className='mobile_cat_selector__item' key={index} onClick={() => fetchBreedImages(breed)}>
                                            <p>{breed}</p>
                                        </div>
                                    ))}

                                    <div onClick={() => setOpenMenu(!openMenu)} className='mobile_cat_selector__item mobile_cat_selector__close'>
                                        <p>Close</p>
                                    </div>
                                </>}
                        </div>

                        <div className='category_display_container' style={{ minHeight: '40vh' }}>
                            <div className='hide_on_mobile category_display_left'>
                                {Object.keys(breeds).map((breed, index) => (
                                    <div className={breed === activeMenu ? 'cat_selector cat_selector__active' : 'cat_selector'} key={index} onClick={() => fetchBreedImages(breed)}>
                                        <p>{breed}</p>
                                    </div>
                                ))}
                            </div>

                            <div className='category_display_right'>
                                {images.map((image, index) => (
                                    <DogImage key={index} image={image} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    site: state.site,
});



const mapDispatchToProps = (dispatch) => ({
    setError: (data) => dispatch(setError(data)),
    setSuccess: (data) => dispatch(setSuccess(data)),
    showSiteModal: () => dispatch(showSiteModal()),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading()),
    hideSiteModal: () => dispatch(hideSiteModal()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Question3);