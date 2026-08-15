
import Navbar from "../components/Navbar";
import CategorySection from "../components/CategorySection";
import ProductCard from "../components/ProductCard";
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
			
            <ProductCard/>
		
            <Footer/>

        </>

    );

}

export default Home;
