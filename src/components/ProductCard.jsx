const products = [

    {
        id:1,
        name:"iPhone 16",
        price:79999,
        image:"https://via.placeholder.com/250"
    },

    {
        id:2,
        name:"Samsung TV",
        price:45999,
        image:"https://via.placeholder.com/250"
    },

    {
        id:3,
        name:"Dell Laptop",
        price:69999,
        image:"https://via.placeholder.com/250"
    },

    {
        id:4,
        name:"Boat Headphones",
        price:2999,
        image:"https://via.placeholder.com/250"
    }

];

function ProductCard(){

    return(

        <div className="container mt-4">

            <div className="row">

                {products.map(product=>(

                    <div className="col-md-3 mb-4" key={product.id}>

                        <div className="card shadow">

                            <img
                                src={product.image}
                                className="card-img-top"
                                alt=""
                            />

                            <div className="card-body">

                                <h5>{product.name}</h5>

                                <h4 className="text-success">
                                    ₹ {product.price}
                                </h4>

                                <button className="btn btn-primary w-100">
                                    Add To Cart
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ProductCard;