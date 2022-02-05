import React from "react";
import { Link } from "react-router-dom";
import SvgIcon from "../../SvgIcons/SvgIcon";
import configuration from "react-global-configuration";

const NotFoundIndex = () => {
  return (
    <>
      <div class="main-content-wrapper">
        <section data-settings="particles-1" class="page-not-found crumina-flying-balls particles-js">

          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-lg-offset-3 col-md-12 col-md-offset-0 col-sm-12 col-xs-12">
                <div class="page-not-found-content">
                  <Link to="/" class="site-logo">
                    <img  src={configuration.get("configData.site_logo")} alt="Woox" />
                    <svg class="woox-icon" viewBox="0 0 481.448 101.996">
                      <path d="M152.514 14.926c0 2.1-1.339 4.593-2.1 7.081L126.3 89.366c-2.487 7.654-8.229 11.673-14.543 11.673-6.889 0-12.056-4.019-15.309-11.673L76.162 43.822 55.877 89.366c-3.253 7.654-8.994 11.673-15.309 11.673-6.7 0-12.056-4.019-14.543-11.673L2.1 22.007C1.148 19.519 0 17.031 0 14.926A14.213 14.213 0 0 1 14.352.574c5.358 0 11.1 3.062 12.821 8.037l15.5 49.18L62.575 9.76C65.063 3.827 69.655.574 76.162.574c6.7 0 11.29 3.253 13.778 9.186l19.71 48.031 15.692-49.18c1.531-4.593 7.271-8.037 12.821-8.037a14.212 14.212 0 0 1 14.351 14.352zM263.69 51.285c0 34.253-29.853 50.711-51.667 50.711-22.006 0-51.859-16.458-51.859-50.711C160.164 17.223 190.016 0 212.022 0c21.815 0 51.668 17.223 51.668 51.285zm-73.292 0c0 14.352 9.568 24.3 21.624 24.3 11.864 0 21.624-9.951 21.624-24.3 0-14.926-9.759-24.877-21.624-24.877-12.055 0-21.622 9.951-21.622 24.877zm190.974 0c0 34.253-29.853 50.715-51.672 50.715-22.006 0-51.858-16.458-51.858-50.711C277.845 17.223 307.7 0 329.7 0c21.819 0 51.672 17.223 51.672 51.285zm-73.291 0c0 14.352 9.567 24.3 21.623 24.3 11.865 0 21.624-9.951 21.624-24.3 0-14.926-9.759-24.877-21.624-24.877-12.056 0-21.623 9.951-21.623 24.877zm173.367 36.932c0 7.271-6.7 13.4-13.97 13.4-4.4 0-7.846-2.3-10.716-5.55l-21.05-24.686-21.05 24.686c-2.87 3.253-6.123 5.55-10.716 5.55-7.08 0-13.97-6.124-13.97-13.4a12.074 12.074 0 0 1 3.254-8.229l25.45-28.9-25.45-28.9a12.348 12.348 0 0 1-3.062-8.037c0-7.463 6.89-13.586 13.97-13.586a13.062 13.062 0 0 1 10.716 5.549L435.712 30.8l20.859-24.676c2.87-3.444 6.315-5.549 10.907-5.549 6.89 0 13.778 6.124 13.778 13.586a12.352 12.352 0 0 1-3.062 8.037l-25.451 28.9 25.451 28.9a11.252 11.252 0 0 1 3.254 8.219z" data-name="Слой 2" />
                    </svg>
                  </Link>


                  <div class="page-not-found-content-wrap">

                    <div class="page-404-thumb">
                      <img src= { window.location.origin + "/assets/img/404.png"} alt="404" />
                    </div>

                    <header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
                      <h2 class="heading-title heading--half-colored">Oops, this page could not be found</h2>
                      <div class="heading-text">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</div>
                    </header>

                    <Link to="/" class="btn btn--large btn--primary btn--transparent btn--with-icon btn--icon-right">
                      Go to Homepage
                      <SvgIcon id="icon-arrow-right" styles="woox-icon icon-arrow-right" hasPath={false}></SvgIcon>
                    </Link>
                  </div>


                  <div class="sub-footer">
                    <div class="widget w-contacts">
                      <ul class="socials">
                      {configuration.get("configData.twitter_link") && (
                          <li className="social-item">
                            <a
                              href={configuration.get("configData.twitter_link")}
                              target="_blank"
                              className="d-flex align-items-center"
                            >
                              <i className="fab fa-twitter woox-icon"></i>
                            </a>
                          </li>
                        )}
                        {configuration.get("configData.instagram_link") && (
                          <li className="social-item ">
                            <a
                              href={configuration.get("configData.instagram_link")}
                              target="_blank"
                              className="d-flex align-items-center"
                            >
                              <i className="fab fa-instagram woox-icon"></i>
                            </a>
                          </li>
                        )}
                        {configuration.get("configData.facebook_link") && (
                          <li className="social-item">
                            <a
                              href={configuration.get("configData.facebook_link")}
                              target="_blank"
                              className="d-flex align-items-center"
                            >
                              <i className="fab fa-facebook-square woox-icon"></i>
                            </a>
                          </li>
                        )}
                        {configuration.get("configData.linkedin_link") && (
                          <li className="social-item">
                            <a
                              href={configuration.get("configData.linkedin_link")}
                              target="_blank"
                              className="d-flex align-items-center"
                            >
                              <i className="fab fa-linkedin-in woox-icon"></i>
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default NotFoundIndex;
