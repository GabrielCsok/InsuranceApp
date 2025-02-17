import Navbar from '../components/Home/Navbar';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import ContentSection from '../components/Home/ContentSection';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar/>
            <Header/>
            <ContentSection 
                id="scroll"
                image="../../img/01.png"
                heading="Protect What Matters Most"
                text="At Evergreen Insurance, we believe that protecting what matters most should be simple and stress-free. Whether you're looking for personal coverage, safeguarding your home, or insuring your car, we’ve got you covered. Our user-friendly application makes it easy to register, explore policies, and submit your requests in just a few clicks. Join us today and experience the peace of mind that comes with tailored insurance solutions."
                reverse={false}
            />
            <ContentSection
                image="../../img/02.png"
                heading="Comprehensive Coverage Made Easy"
                text="Life can be unpredictable, but your insurance doesn’t have to be. With Evergreen Insurance, you can choose from a variety of plans designed to fit your needs. From personal protection to house and car insurance, we provide reliable coverage for every stage of life. Manage everything seamlessly through our intuitive platform and get the support you need, when you need it."
                reverse={true}
            />
            <ContentSection
                image="../../img/03.png"
                heading="Why Choose Evergreen Insurance?"
                text="Simple Registration: Get started quickly and easily through our online platform.
                Flexible Options: Pick the insurance type that suits you best – personal, house, or car.
                Effortless Management: Request policies, track progress, and stay informed, all in one place.
                Evergreen Insurance is here to provide protection and peace of mind for every aspect of your life."
                reverse={false}
            />
            <Footer/>
        </div>
    );
}

export default Home;