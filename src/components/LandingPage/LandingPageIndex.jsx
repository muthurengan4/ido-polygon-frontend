import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SvgIcon from "../SvgIcons/SvgIcon";
import { Helmet } from "react-helmet";
import { fetchFaqStart } from "../store/actions/FaqAction";
import { fetchSubscriptionStart } from "../store/actions/SubscriptionAction";
import { connect } from "react-redux";
import configuration from "react-global-configuration";

const LandingPageIndex = (props) => {
  const pricingHeading = [
    "bronze",
    "silver",
    "gold",
    "platinum",
    "diamond",
    "blue diamond",
  ];

  useEffect(() => {
    props.dispatch(fetchFaqStart({ faq_unique_id: "FAQ-1-60f07624131b5" }));
    props.dispatch(fetchSubscriptionStart());
  }, []);

  return (
    <div className="main-content-wrapper">
      {/* load the script for every render !important */}
      <Helmet>
        <script
          src={window.location.origin + "/assets/js/js-plugins/orbitlist.js"}
        ></script>
      </Helmet>
      <section
        data-settings="particles-1"
        className="main-section crumina-flying-balls particles-js medium-padding120 responsive-align-center bg-1 section-padding home-section"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
              <img
                className="responsive-width-50"
                src={window.location.origin + "/assets/img/busdx-logo.png"}
                alt="image"
              />
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="banner-text-content">
                <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                  <h1 className="medium-font-size weight-normal no-margin">
                    Xpad is one of the most upfront and transparent Decentralized IDO platforms on the Binance Smart Chain
                  </h1>
                  {/* <h5 className="c-primary letter-2 second-heading mt-3">
                  The prolific website empowers cryptocurrency projects with the
                  capacity to dispense tokens and increase liquidity.
                </h5> */}
                </header>
                <div className="row banner-btn">
                  <Link
                    data-scroll
                    to="/projects"
                    className="btn btn--medium btn--transparent btn--primary text-capitalize landing secondry-button m-0"
                  >
                    View All Projects
                  </Link>
                  <a
                    data-scroll
                    target="_blank"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfW-X_fTosshtGEpGdz-8V-DpFu8bm3ifB6cwBiIDqRohvCMw/viewform?vc=0&c=0&w=1&flr=0&usp=mail_form_link"
                    className="btn btn--medium btn--transparent btn--primary text-capitalize landing secondry-button m-0 m-l-10"
                    style={{ marginLeft: "10px !important" }}
                  >
                    Apply For IDO
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
        <svg
          className="hide-svg-shape"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12 no-padding-md">
              <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                {/* <p className="c-secondary text-center mb-2 text-capitalize text-bold letter-2">
                  what and why
                </p>
                <h2 className="weight-bold no-margin text-center text-uppercase mb-3 letter-2">
                  About us
                </h2> */}
              </header>
              <div className="row no-margin">
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                  <div className="place-center">
                    <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                      <h5 className="weight-normal no-margin text-uppercase aboutus-heading">
                        What is Xpad?
                      </h5>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit">
                        The Xpad is deemed to be one of the most upfront and transparent IDO platforms of the Binance Smart Chain. The tier system is set up to allow everyday investors the chance to participate in IDO’s. Xpad supports projects with the ability to distribute tokens and raise liquidity, while providing free marketing and guaranteed investors.
                      </p>
                    </div>
                    <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                      {/* <h5 className="weight-normal no-margin text-uppercase aboutus-heading">
                        Why Choose Us?
                      </h5> */}
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit custom-bullet primary">
                        The Xpad has figured out a means to
                        reward and incentivize all token holders in a way that
                        is both inclusive and low-barrier to entry.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit custom-bullet primary">
                        The underlying culpability of present launchpads is that
                        obtaining enough tokens to participate in the ecosystem
                        is prohibitively expensive, and even if you do have the
                        tokens, an allocation slot is not guaranteed.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit custom-bullet primary">
                        They work on a first-come, first-served basis, with
                        automated bots able to fill whitelist slots in a matter
                        of seconds. Xpad creates decentralized
                        launches that are fair.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit custom-bullet primary">
                        The Xpad is distinguished by a two-round
                        method that ensures an allocation for every tier level.
                        There are no luck, lotteries, or bots in this game; only
                        evenly dispersed rewards for all players.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                  <div className="landing-image-wrapper">
                    <img
                      src={window.location.origin + "/assets/img/aboutus.png"}
                      alt="aboutus"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section-padding pricing bg-1">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
              <h3 className="weight-bold no-margin text-center text-uppercase mb-3">
                the Xpad Tiered system
              </h3>
              <h4 className="c-primary banner-subheading text-center mb-3">
                Xpad will showcase a fixed tier system based on the number of tokens held
              </h4>
            </header>
            <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
              <h4 className="weight-bold no-margin text-uppercase aboutus-heading text-center mb-3 text-muted-custom">
                Round 1 - allocation Round
              </h4>
            </div>
            {pricingHeading.map((heading , index) => (
              <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 my-3 no-padding " key={index} data-mh="pricing-item">
                <div className="crumina-module crumina-pricing-table pricing-table--style1 mx-md-3">
                  <h5 className="pricing-title c-primary text-capitalize custom-letter-spacing">{heading}</h5>
                  <div className="custom-hr"></div>
                  <div className="custom-stack-details">
                    <div className="req-wrapper">
                      <h6 className="text-center">stake requirement</h6>
                      <h4 className="text-center c-primary custom-letter-spacing">1000</h4>
                    </div>
                    <div className="req-wrapper">
                      <h6 className="text-center">stake length required</h6>
                      <h5 className="text-center text-muted-custom">3 hour before allocation </h5>
                      <h5 className="text-center text-muted-custom">Round Opens </h5>
                    </div>
                    <div className="req-wrapper">
                      <h6 className="text-center">Guaranteed allocation</h6>
                      <h4 className="text-center c-primary text-capitalize custom-letter-spacing">yes</h4>
                    </div>
                    <div className="req-wrapper">
                      <h6 className="text-center">pool weight</h6>
                      <h4 className="text-center c-primary text-capitalize custom-letter-spacing">10</h4>
                    </div>
                    <div className="custom-hr mb-3"></div>
                  </div>
                  <a href="#" className="btn btn--large btn--primary full-width blacktext">Learn More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
       </div>
    </section> */}

      {props.subscriptions.loading ? null : props.subscriptions.data.length > 0 ? (
        <section className="section-padding landing-shape-2">
          <div className="container">
            <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
              <h3 className="weight-bold no-margin text-center text-uppercase letter-2 secondary-text">
                TIERS
              </h3>
            </header>
            <div className="tire-box">
              {props.subscriptions.data.map((subscription) => (
                <div className="tire-card">
                  <div className="tire-card-img">
                    <img
                      src={subscription.picture}
                      alt={subscription.title}
                    />
                  </div>
                  <div className="tire-card-info">
                    <h2 className="text-uppercase">
                      {subscription.title}
                    </h2>
                    <p>Minimum Staking Balance (BUSDX): {subscription.min_staking_balance}</p>
                    <p>Allowed Tokens (BUSD): {subscription.allowed_tokens}</p>
                    <p>{subscription.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12">
              <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                {/* <p className="c-secondary text-center mb-2 text-capitalize text-bold letter-2 secondary-text">
                  what and why
                </p> */}
                <h3 className="weight-bold no-margin text-center text-uppercase letter-2 secondary-text">
                  Round 2 - FCFS Round
                </h3>
              </header>
              <div className="row no-margin">
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                  <div className="landing-image-wrapper">
                    <img
                      src={window.location.origin + "/assets/img/round2-2.png"}
                      alt="Round 2 - FCFS Round"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 no-padding-md mt-md-5">
                  <div className="place-center">
                    <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit secondary-text custom-bullet secondary">
                        The unsold tokens from the first round are made
                        available in the second round. An additional amount
                        decided by a tier-based algorithm is available to all
                        tiered members. Regardless of tier level, the second
                        round buying window opens at the same time for all
                        members. This round will remain open until all tokens
                        have been sold, which usually takes only a few minutes.
                        The IDO will be completed once all of the tokens have
                        been sold.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit secondary-text custom-bullet secondary">
                        Data and feedback on the IDO structure will be collected
                        in order to optimize the system over time, as well as
                        community feedback and potential DAO proposals will be
                        taken into consideration.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit secondary-text custom-bullet secondary">
                        Our system is a predictable and provably fair system
                        that provides appropriate incentives for our users to
                        gather and hold tokens and support each and every
                        project launched. Weights will be tweaked, new levels
                        will be added, and other characteristics will be changed
                        as needed to maintain the system functioning,
                        competitive, and rewarding for all community members.
                      </p>
                      <p className="letter-3 text-normal text-muted text-justify letter-inherit secondary-text custom-bullet secondary">
                        Xpad is the next generation of blockchain
                        launchpads, addressing the issues that plague current
                        launchpads. This platform benefits all token holders and
                        enables fair launches, allowing traders of all sizes to
                        invest in the greatest forthcoming Binance Smart Chain
                        Projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <svg
              className="hide-svg-shape"
              style={{ visibility: "none" }}
            >
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* <section className="advisors section-padding"> */}
      {/* <div className="container">
          <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
            <h3 className="weight-bold no-margin text-center text-uppercase letter-2">
              INCUBATOR AND INVESTMENT PARTNERS
            </h3>
            <p className="c-secondary text-center mb-2 text-capitalize text-bold letter-2">
              our members are a great part of our team
            </p>
          </header>
          <div className="row align-center no-margin">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
              <div className="advisors-wrapper"> */}
      {/* <img  src={configuration.get("configData.site_logo")} alt="" /> */}
      {/* <h3 className="c-primary letter-2">BlueZilla</h3>
                <div className="advisors-contents">
                  <p className="text-center mb-3 text-capitalize">
                    Through our market-leading advising, investment,
                    development, influencer marketing, and legal support
                    services, we specialize in getting your unique and new idea
                    from inception to completion.
                  </p>
                  <p className="text-center mb-3 text-capitalize">
                    We are the only venture capital firm with in-house
                    developers, designers, marketers, influencers, traders,
                    legal counsel, and launch pads.
                  </p>
                  <p className="text-center mb-3 text-capitalize">
                    Not only do we provide funding and partners, but we also
                    assist with all area of your project, from tokenomics
                    through post-launch marketing.
                  </p>
                </div>
              </div>
            </div> */}

      {/* <ul id="traders" className="orbit ">
              <li className="relative has-popup">
                <div className="author-block author-block--column hover-shadow-bottom js-open-popup js-body-overlay">
                  <div className="avatar avatar320">
                    <img src={window.location.origin + "/assets/img/author3-320.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">Brenda Bush</a>
                    <div className="author-prof">Chief Finance Officer</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "/assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-popup">
                <div className="author-block author-block--column hover-shadow-top js-open-popup js-body-overlay">
                  <div className="avatar avatar200">
                    <img src={window.location.origin + "/assets/img/author1-200.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">Frank Godman</a>
                    <div className="author-prof">Chief Marketing Officer</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-popup">
                <div className="author-block author-block--column hover-shadow-left-top js-open-popup js-body-overlay">
                  <div className="avatar avatar320">
                    <img src={window.location.origin + "/assets/img/author1-320.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">Angelina Johnson</a>
                    <div className="author-prof">Tax Consultant</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "/assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-popup">
                <div className="author-block author-block--column hover-shadow-right js-open-popup js-body-overlay">
                  <div className="avatar avatar200">
                    <img src={window.location.origin + "/assets/img/author3-200.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">James Anderson</a>
                    <div className="author-prof">Coins Sales and Marketing</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "/assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-popup">
                <div className="author-block author-block--column hover-shadow-bottom js-open-popup js-body-overlay">
                  <div className="avatar avatar320">
                    <img src={window.location.origin + "/assets/img/author3-320.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">Brenda Bush</a>
                    <div className="author-prof">Chief Finance Officer</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "/assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-popup">
                <div className="author-block author-block--column hover-shadow-right-bottom js-open-popup js-body-overlay">
                  <div className="avatar avatar320">
                    <img src={window.location.origin + "/assets/img/author2-320.jpg"} alt="avatar" />
                  </div>
                  <div className="author-content">
                    <a href="#" className="h6 author-name">Peter Spenser</a>
                    <div className="author-prof">Senior Trader</div>
                  </div>
                </div>
                <div className='window-popup'>
                  <div className="mCustomScrollbar" data-mcs-theme="dark">
                    <div className='content'>
                      <div className="author-details">
                        <a className='js-open-popup js-body-overlay popup-close' href='#'>
                          <svg className="woox-icon icon-close"><use xlinkHref="#icon-close"></use></svg>
                        </a>
                        <div className="avatar-details">
                          <img src={window.location.origin + "/assets/img/author-details.jpg"} alt="team member" />
                        </div>
                        <div className="author-content">
                          <div className="author-prof">Founder & CEO</div>
                          <h3 className="author-name">James Anderson</h3>
                          <blockquote className="quote--style2">
                            <p>Qel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat vitae nunc sed velit.</p>
                          </blockquote>
                          <p>
                            Odio aenean sed adipiscing diam. Placerat in egestas erat imperdiet sed
                            euismod nisi. Libero justo laoreet sit amet. Neque volutpat ac tincidunt
                            vitae semper. Aliquam id diam maecenas ultricies. Aenean euismod elementum
                            nisi quis vitae nunc sed velit.
                          </p>

                          <div className="socials">
                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-twitter woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-dribbble woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-instagram woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-linkedin-in woox-icon"></i>
                              </a>
                            </div>

                            <div className="social-item">
                              <a href="#">
                                <i className="fab fa-facebook-square woox-icon"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul> */}
      {/* </div>
        </div >
      </section > */}

      {/* <section className="section-padding legalpartner-margin">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
              <img src={window.location.origin + "/assets/img/Partnership.png"} alt="" />
            </div>
            <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center">
              <div className="box">
                <header className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                  <p className="c-secondary  mb-2 text-capitalize text-bold letter-2">
                    what and why
                  </p>
                  <h3 className="weight-bold no-margin  text-uppercase letter-2">
                    Legal partner
                  </h3>
                </header>
                <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
                  <h6 className="weight-normal no-margin text-uppercase aboutus-heading">
                    Silk Legal:
                  </h6>
                  <p className="letter-3 text-normal text-muted text-justify letter-inherit">
                    Silk Legal is a FinTech and Cryptocurrency-focused boutique
                    law company. To examine difficulties, risks, and
                    possibilities, we combine a thorough understanding of
                    blockchain technology with professional knowledge of
                    international regulations. Silk Legal is a proud member of
                    Global Digital Finance, the premier global association of
                    digital asset companies dedicated to promoting and
                    accelerating the implementation of digital asset best
                    practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="cta-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-xs-12 col-md-12 col-lg-12 col-xl-12 d-flex align-items-center justify-content-center">
              <div className="contact-us-card">
                <h4>Interested in listing your project on our platform? Please contact us and we will get in touch with you!</h4>
                <Link to="/contact-us" type="button" className="btn btn--medium  btn--transparent btn--primary text-capitalize secondry-button">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {
        props.faqData.loading ? (
          "Loading ...."
        ) : (
          <>
            <section className="section-padding">
              <div className="container-fluid">
                <div className="row no-margin">
                  <header className="crumina-module crumina-heading heading--h1 heading--with-decoration w-100">
                    <h3 className="weight-bold no-margin text-center text-uppercase letter-2">
                      FAQ
                    </h3>
                  </header>
                  <div className="accordion--style3 w-100">
                    <div className="row no-margin w-100">
                      {props.faqData.data.length > 0 &&
                        props.faqData.data.map((faq, index) => (
                          <>
                            {faq.status == 1 && (
                              <div
                                className="col-lg-6 col-md-12 col-xs-12 col-sm-12"
                                key={index}
                              >
                                <div className="accordion-panel">
                                  <div className="panel-heading">
                                    <a
                                      href={`#accordion${index}`}
                                      className="accordion-heading collapsed"
                                      data-toggle="collapse"
                                      data-parent="#accordion"
                                      aria-expanded="false"
                                    >
                                      <span className="icons">
                                        <svg className="woox-icon icon-plus-sign">
                                          <use xlinkHref="#icon-plus-sign"></use>
                                        </svg>
                                        <svg class="woox-icon active icon-min">
                                          <use xlinkHref="#icon-min"></use>
                                        </svg>
                                      </span>
                                      <span class="title">{faq.question}</span>
                                    </a>
                                  </div>
                                  <div
                                    id={`accordion${index}`}
                                    class="panel-collapse collapse"
                                    aria-expanded="false"
                                    role="tree"
                                  >
                                    <div class="panel-info">{faq.answer}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      } */}
    </div >
  );
};

const mapStateToPros = (state) => ({
  faqData: state.faq.faqData,
  subscriptions: state.subscriptions.subscription,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(LandingPageIndex);
