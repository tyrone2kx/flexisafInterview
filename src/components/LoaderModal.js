import React from 'react';
import Modal from 'react-modal';
import { cross } from 'react-icons-kit/metrize/cross';
import { Icon } from 'react-icons-kit';
import { checkCircle } from 'react-icons-kit/feather/checkCircle'

const LoaderModal = ({ loaderModalIsOpen, loading, error, success, closeLoaderModal }) => {

    return (
        <Modal
            isOpen={loaderModalIsOpen}
            onRequestClose={closeLoaderModal}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            className='loader__modal'
        >
            <div className='loader__modal__container'>
                <div style={{ padding: '10px' }}>
                    {loading === false && <Icon size={24} icon={cross} className='closeModal' onClick={closeLoaderModal} />}
                </div>



                <div className='loaderContentContainer'>
                    <div>
                        <div className='loaderCircleContainer'>
                            {loading === true && <div className='loaderCircle'></div>}
                            {success && <Icon className='successText' icon={checkCircle} size={50} />}
                            {error && <Icon className='errorText' icon={cross} size={50} />}
                        </div>


                        <div style={{padding:'10px'}}>
                            {error !== '' && <p className='errorText'>{error}</p>}
                            {success !== '' && <p className='successText'>{success}</p>}
                        </div>
                    </div>
                </div>


            </div>
        </Modal>
    )
}

export default LoaderModal
