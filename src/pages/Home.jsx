
import Navbar from "../components/Navbar";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ProductsHome from "../components/ProductsFeed";


function Home(){

	
    return(
		
            <>
			
            <Navbar/>
	
		    <Banner/>
	
            <CategorySection/>

			<ProductsHome />
			
            <Footer/>

        </>

    );

}

export default Home;
