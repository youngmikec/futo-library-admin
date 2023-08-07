import React from 'react'

import About from '../Components/About'
import Footer from '../Components/Footer'
import ImageSlider from '../Components/ImageSlider'
import News from '../Components/News'
import PhotoGallery from '../Components/PhotoGallery'
import PopularBooks from '../Components/PopularBooks'
import RecentAddedBooks from '../Components/RecentAddedBooks'
import ReservedBooks from '../Components/ReservedBooks'
import Stats from '../Components/Stats'

import Header from '../Components/Header';


function Home() {
    return (
        <>
            <Header />
            <div id='home'>
                <ImageSlider/>
                <About/>
                <Stats/>
                <RecentAddedBooks/>
                <PopularBooks/>
                <ReservedBooks/>
                <Footer/>
            </div>
        </>
    )
}

export default Home
