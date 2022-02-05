import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SvgIcon from "../../SvgIcons/SvgIcon";


const FooterIndex = (props) => {


  return (
    <>
      <footer id="site-footer" className="footer ">
        <div className="container no-padding">
          <div className="row no-margin w-100">
            <div className="col-lg-12 col-md-12 col-sm-12  col-xs-12 no-padding">
              <div className="footer-wrapper">
                <img className="footerBgImage" src={window.location.origin + "/assets/img/footer-bg.png"} alt="" />
                <div className="container-centerit">
                  <h4 className="text-center text-uppercase text-bold text-uppercase heading sync-with-footer-top mb-3 letter-2">contact</h4>
                  <div className="widget w-contacts placefooterLinkscenter">
                    <h5 className="text-center text-uppercase text-bold text-uppercase letter-2 mt-0 mb-2">join us</h5>
                    <ul className="socials socials--white footer-links d-flex mt-0 mb-3">
                      {configuration.get("configData.twitter_link") && (
                        <li className="social-item d-flex align-items-center justify-content-center my-3">
                          <a
                            href={configuration.get("configData.twitter_link")}
                            target="_blank"
                            className="d-flex align-items-center"
                          >
                            <img className="footer-svg-icons twitter-svg" src={window.location.origin + "/assets/img/Icons/Twitter.svg"} alt="twitter" />
                          </a>
                        </li>
                      )}
                      {configuration.get("configData.facebook_link") && (
                        <li className="social-item d-flex align-items-center justify-content-center my-3">
                          <a
                            href={configuration.get("configData.facebook_link")}
                            target="_blank"
                            className="d-flex align-items-center"
                          >
                            <img className="footer-svg-icons" src={window.location.origin + "/assets/img/Icons/Facebook.svg"} alt="facebook" />
                          </a>
                        </li>
                      )}
                      {configuration.get("configData.instagram_link") && (
                        <li className="social-item d-flex align-items-center justify-content-center my-3">
                          <a
                            href={configuration.get("configData.instagram_link")}
                            target="_blank"
                            className="d-flex align-items-center"
                          >
                            <img className="footer-svg-icons" src={window.location.origin + "/assets/img/Icons/Insta.svg"} alt="Insta" />
                          </a>
                        </li>
                      )}
                      {configuration.get("configData.linkedin_link") && (
                        <li className="social-item d-flex align-items-center justify-content-center my-3">
                          <a
                            href={configuration.get("configData.linkedin_link")}
                            target="_blank"
                            className="d-flex align-items-center"
                          >
                            <img className="footer-svg-icons" src={window.location.origin + "/assets/img/Icons/Linkedin.svg"} alt="Linkedin" />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="sub-footer sync-with-footer">
                    <div className="placefooterLinkscenter">
                      {configuration.get("configData.contact_email") && (
                        <a
                          className="my-3 contactLinks"
                          href={
                            "mail:" + configuration.get("configData.contact_email")
                          }
                        >
                          <img className="sub-footer-icons" src={window.location.origin + "/assets/img/Icons/Mail.svg"} alt="mail" />
                          <p className="mb-0 ml-3 text-bold whitecolor">
                            {configuration.get("configData.contact_email")}
                          </p>
                        </a>
                      )}
                      {configuration.get("configData.contact_mobile") && (
                        <a
                          className="my-3 contactLinks"
                          href={
                            "tel:" + configuration.get("configData.contact_mobile")
                          }
                        >
                        <img className="sub-footer-icons" src={window.location.origin + "/assets/img/Icons/Phone.svg"} alt="phone" />
                          <p className="mb-0 ml-3 text-capitalize text-bold whitecolor">
                            {configuration.get("configData.contact_mobile")}
                          </p>
                        </a>
                      )}
                      {configuration.get("configData.contact_address") && (
                        <a className="my-3 contactLinks justify-content-center" href="#">
                        <img className="sub-footer-icons" src={window.location.origin + "/assets/img/Icons/Address.svg"} alt="mail" />
                          <p className="mb-0 ml-3 text-capitalize text-bold whitecolor footer-address">
                            {configuration.get("configData.contact_address")}
                          </p>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a className="back-to-top" href="#">
          <SvgIcon
            id="icon-top-arrow"
            styles="woox-icon icon-top-arrow"
            hasPath={false}
          />
        </a>
      </footer>
      <footer className="p-4 d-flex justify-content-between footer-sec">
          <div className="row no-margin w-100">
            <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 no-padding d-flex align-items-center">
              {configuration.get("configData.copyright_content") && (
                <p className="whitecolor text-capitalize mb-0  copyWrite w-100">
                  {configuration.get("configData.copyright_content")}
                </p>
              )}
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 no-padding">
              {configuration.get("configData.footer_pages1") && (
                <>
                  <ul className="footerStaticLinks">
                    {configuration
                      .get("configData.footer_pages1")
                      .map((link, index) => (
                        <li key={index}>
                          <Link
                            to={`/pages/${link.static_page_unique_id}`}
                            className="text-capitalize"
                          >
                            {link.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* {configuration.get("configData.version") && (
            <p className="whitecolor text-capitalize mb-0">{configuration.get("configData.version")}</p>
          )} */}

        </footer>
    </>
  );
};



export default (FooterIndex);
