/**
 * Created by jf on 15/12/10.
 */

"use strict";

import React from 'react';
import './page.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default class Page extends React.Component {
    render() {
        const {title, subTitle, spacing, className, children, footer} = this.props;

        return (
            <section className={`page ${className}`}>
                <Header />
                <div className="page__hd">
                    <h1 className="page__title">{title}</h1>
                    <p className="page__desc">{subTitle}</p>
                </div>
                <div className={`page__bd ${spacing ? 'page__bd_spacing' : ''}`}>
                    {children}
                </div>
                { footer ?
                <div className="page__ft">
                    {footer}
                </div> : false }
                <Footer />
            </section>
        );
    }
};