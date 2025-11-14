import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ title, items }) => {
  return (
    <section className="breadcrumb__section breadcrumb__bg">
      <div className="container">
        <div className="row row-cols-1">
          <div className="col">
            <div className="breadcrumb__content text-center">
              <h1 className="breadcrumb__content--title text-white mb-25">{title}</h1>
              <ul className="breadcrumb__content--menu d-flex justify-content-center">
                <li className="breadcrumb__content--menu__items">
                  <Link className="text-white" to="/">Home</Link>
                </li>
                {items && items.map((item, index) => (
                  <li key={index} className="breadcrumb__content--menu__items">
                    {item.link ? (
                      <Link className="text-white" to={item.link}>{item.label}</Link>
                    ) : (
                      <span className="text-white">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
