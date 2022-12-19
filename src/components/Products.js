import React, { useEffect } from 'react';
import { STATUSES } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts } from '../store/productSlice';

const Products = () => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const res = await fetch('https://fakestoreapi.com/products');
    //         const data = await res.json();
    //         console.log(data);
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // });

    const {data: products, status} = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleClick = (product) => {
        dispatch(add(product));
    };

    if (status === STATUSES.LOADING) {
        return <h2>loading ✈️✈️...</h2>
    }

    if (status === STATUSES.ERROR) {
        return <h2>something went wrong 👎👎 ...</h2>
    }

    return (
        <div className='productsWrapper'>
            {products.map((product) => (
                <div className='card' key={product.id}> 
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h3>{product.price} $</h3>
                    <button className='btn' onClick={() => handleClick(product)}>add to cart</button>
                </div>
            ))}
        </div>
    )
}

export default Products