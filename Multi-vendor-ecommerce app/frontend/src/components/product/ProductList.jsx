import ProductCard from "../ProductCard";

export default function ProductList({

    products

}) {

    return (

        <div className="grid gap-8 md:grid-cols-4">

            {

                products.map(product => (

                    <ProductCard

                        key={product.id}

                        product={product}

                    />

                ))

            }

        </div>

    );

}