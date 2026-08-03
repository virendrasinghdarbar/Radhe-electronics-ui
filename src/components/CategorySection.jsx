const categories = [
    "Mobiles",
    "Laptops",
    "TV",
    "Headphones",
    "Camera",
    "Watch",
    "Speakers",
    "Accessories"
];

function CategorySection() {

    return (

        <div className="container mt-4">

            <div className="row">

                {categories.map((item, index) => (

                    <div
                        className="col-md-3 col-6 mb-3"
                        key={index}
                    >

                        <div className="card text-center shadow-sm">

                            <div className="card-body">

                                <h5>{item}</h5>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default CategorySection;