
import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router'
import Pagination from './pagination';

function Product() {

    const { login } = useParams();

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    // pagiantion
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(`https://api.github.com/users/${login}/repos`);
            setProduct(await response.json());
            console.log(product);
            setLoading(false)
            return () => {
                componentMounted = false
            }
        }
        getProducts();

    }, []);

    //pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProduct = product.slice(indexOfFirstPost, indexOfLastPost);

    //change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const Loading = () => {
        return (
            <div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
                <div className='col-md-3'>
                    <Skeleton height={350} />
                </div>
            </div>
        );




    };




    const ShowProduct = () => {
        return (
            <>
                {currentProduct.map((rep) => {
                    return (

                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{rep.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{rep.full_name}</h6>
                                <p className="card-text">{rep.description}</p>
                                <a href={rep.html_url} className="card-link" target='__blank'>REPO LINK</a>
                                {/*<a href={product.owner.html_url} className="card-link">OWNER GITHUB</a>*/}
                            </div>
                        </div>

                    )
                })}



            </>
        )
    }



    return (
        <>
            <div>
                <div className="container my-5 py-5">

                    <div className="row justify-content-center">
                        {loading ? <Loading /> : <ShowProduct />}
                    </div>
                </div>
            </div>
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={product.length}
            paginate={paginate}
          />
        </>
    )


}

export default Product

