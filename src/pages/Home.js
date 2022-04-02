import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import apiRequest from "../apiRequest";
import Page from "../Page";

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();

  const { data } = useQuery(
    ['products', searchParams.get('search')],
    () => apiRequest('GET', `api/products?q=${searchParams.get('search') || ''}`)
  );
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSearchValue(searchParams.get('search'));
  }, []);

  function onSearchSubmit(e) {
    e.preventDefault();

    setSearchParams({
      search: searchValue
    });
  }

  return (
    <Page>
      {/* Header*/}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>

      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">

        <div className="search">
          <form action="" onSubmit={onSearchSubmit}>
            <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>

          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {
              (data || []).map(item => (
                <div className="col mb-5" key={item.id}>
                  <div className="card h-100">
                    <Link to={`/product/${item.id}`}>
                      <img
                        className="card-img-top"
                        src={item.image}
                        alt="..."
                      />
                    </Link>
                    {/* Product details*/}
                    <div className="card-body p-4">
                      <div className="text-center">
                        {/* Product name*/}
                        <Link to={`/product/${item.id}`}>
                          <h5 className="fw-bolder">{item.title}</h5>
                        </Link>
                        {/* Product price*/}
                        ${item.price}
                      </div>
                    </div>
                    {/* Product actions*/}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <a className="btn btn-outline-dark mt-auto" href="#">
                          View options
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </Page>
  )
}