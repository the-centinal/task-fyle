import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'

function Productslist() {
    const [data, setData] = useState([]);
    // const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://api.github.com/users");
            if (componentMounted) {
                setData(await response.json());
                // setFilter(await response.json());
                setLoading(false)
                console.log(data);
            }
            return () => {
                componentMounted = false
            }
        }
        getProducts();
    }, [])


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

   


    const ShowProducts = () => {
        return (
            <>

                
                {data.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.avatar_url} class="card-img-top" alt={product.title} height="250px" />
                                    <div class="card-body">
                                        <h5 className="card-title mb-0">{product.login.substring(0, 100)}</h5>
                                        <br />
                                        {/*<p className="card-text lead fw-bold">$ {product.price}</p>*/   }
                                        
                                        <NavLink to={`/users/${product.login}/repos`} className="btn btn-outline-dark">SHOW REPOS</NavLink>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}

export default Productslist