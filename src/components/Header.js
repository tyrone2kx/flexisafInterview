import React, { useEffect, useState } from "react";
import { Icon } from 'react-icons-kit';
import { bellO } from 'react-icons-kit/fa/bellO'
import { ic_power_settings_new } from 'react-icons-kit/md/ic_power_settings_new'
import { shoppingCart } from 'react-icons-kit/fa/shoppingCart'
import { search } from 'react-icons-kit/fa/search';
import { ic_menu } from 'react-icons-kit/md/ic_menu'
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { hideSiteModal, setTheme } from "../actions/site";
import { History } from "../routers/AppRouter";
import LoaderModal from "./LoaderModal";

const DARK_CLASS = "dark";


const Header = (props) => {



    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)"
        },
        undefined,
        prefersDark => {
            setIsDark(prefersDark);
        }
    );


    const siteTheme = props.site.theme ? props.site.theme : false;

    const [isDark, setIsDark] = useState(siteTheme);

    const setSiteTheme = (e) => {
        const value = e.target.checked;
        props.setTheme(value)
    }



    useEffect(() => {
        if (props.site.theme === undefined) {
            props.setTheme(systemPrefersDark)
        }
        if (props.site.theme === true) {
            document.documentElement.classList.add(DARK_CLASS)
        }
        else if (props.site.theme === false) {
            document.documentElement.classList.remove(DARK_CLASS)
        }
    }, [props.site.theme]);


    const [menuStatus, setMenuStatus] = useState(false);

    const openMenu = () => {
        document.getElementById('menuToggle').style.height = '100vh';
        setMenuStatus(true);
    }

    const closeMenu = () => {
        document.getElementById('menuToggle').style.height = '0px';
        setMenuStatus(false);
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const openSearchModal = () => {
        setSearchModalIsOpen(true);
    }

    const closeSearchModal = () => {
        setSearchModalIsOpen(false);
    }


    return (
        <div>
            <div>
                <div className='header_desktop'>
                    <h3 onClick={() => History.push('/')} style={{ cursor: 'pointer' }} className='logo'><span className='logoGreen'>FLEXI</span>SAF</h3>

                    <div style={{ display: 'flex' }}>
                        <div className='header_icon__container' onClick={() => History.push('/')}>
                            <p>Question 1</p>
                        </div>
                        <div className='header_icon__container' onClick={() => History.push('/Q2')}>
                            <p>Question 2</p>
                        </div>
                        <div className='header_icon__container' onClick={() => History.push('/Q3')}>
                            <p>Question 3</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Toggle
                            className="DarkToggle"
                            checked={siteTheme}
                            onChange={setSiteTheme}
                            icons={{ checked: "🌙", unchecked: "🔆" }}
                            aria-label="Dark mode"
                        />
                    </div>
                </div>
                {props.space && <div style={{ height: '30px' }} className='hide_on_mobile'></div>}
            </div>








            <div className='show_on_mobile' style={{ marginBottom: '50px' }}>
                <div className='header_mobile'>
                    <div className='header_mobile_container'>
                        <h3 onClick={() => History.push('/')} className='logo'><span className='logoGreen'>FLEXI</span>SAF</h3>
                        <div style={{ display: 'flex' }}>
                            <div className='header_icon__container'>
                                <Icon className='header_icon' size={24} icon={ic_menu} onClick={() => { menuStatus ? closeMenu() : openMenu() }} />
                            </div>
                        </div>
                    </div>
                    <div className='header_mobile__menu_section' id='menuToggle'>
                        <div className='header_mobile__menu_container' onClick={() => History.push('/')}>
                            <p>Question 1</p>
                        </div>
                        <div className='header_mobile__menu_container' onClick={() => History.push('/Q2')}>
                            <p>Question 2</p>
                        </div>
                        <div className='header_mobile__menu_container' onClick={() => History.push('/Q3')}>
                            <p>Question 3</p>
                        </div>

                        <div className='header_mobile__menu_container'>
                            <Toggle
                                className="DarkToggle"
                                checked={siteTheme}
                                onChange={setSiteTheme}
                                icons={{ checked: "🌙", unchecked: "🔆" }}
                                aria-label="Dark mode"
                            />
                        </div>
                    </div>
                </div>
            </div>

            

            <LoaderModal
                loaderModalIsOpen={props.site.showSiteModal}
                loading={props.site.loading}
                error={props.site.error}
                success={props.site.success}
                closeLoaderModal={props.hideSiteModal}
            />
            
        </div>

    )
}




const mapStateToProps = (state) => ({
    site: state.site,
    user: state.user
})


const mapDispatchToProps = (dispatch) => ({
    hideSiteModal: () => dispatch(hideSiteModal()),
    setTheme: (theme) => dispatch(setTheme(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);



