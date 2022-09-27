import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js';
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'


function Productslist() {


    const [query, setQuery] = useState('');

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


    const fuse = new Fuse(data, {
        keys: [
            'login'
        ],

    })
    const results = fuse.search(query);
    const searchedData = query ? results.map(result => result.item) : data;

    function handleSearch({currentTarget = {}}) {
        const { value } = currentTarget;
        setQuery(value)
        
    }

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


                {searchedData.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.avatar_url} class="card-img-top" alt={product.title} height="250px" />
                                    <div class="card-body">
                                        <h5 className="card-title mb-0">{product.login.substring(0, 100)}</h5>
                                        <br />
                                        {/*<p className="card-text lead fw-bold">$ {product.price}</p>*/}

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
        <>
            <nav className="navbar bg-light" style={{marginTop : "5%" }}>
                <div className="container-fluid">
                    <form clasNames="d-flex" role="search" style={{display: "flex", margin: "auto"}}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={handleSearch} />
                           
                    </form>
                </div>
            </nav>
            <div>
                <div className="container my-5 py-5">

                    <div className="row justify-content-center">
                        {loading ? <Loading /> : <ShowProducts />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Productslist