import React from 'react';

//
//  Assets
//
import headerLogo from './../../Assets/header-logo.svg';

//
//  Styles
//
import './style.css';

export default function Header () {
    return(
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-xs-8 col-xs-offset-2 col-md-12 col-md-offset-0">
                        <img className="logo" src={headerLogo} alt="Volanty" />
                    </div>
                </div>
            </div>
        </header>
    )
}