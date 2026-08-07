
import Navbar from "../components/Navbar";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import Banner from "../components/Banner";


function Home(){

	
    return(
		
            <>
			
            <Navbar/>
	
		    <Banner/>
	
            <CategorySection/>

            <ProductCard/>

            <Footer/>

        </>

    );

}

export default Home;
