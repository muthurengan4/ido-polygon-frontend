import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SvgIcon from "../SvgIcons/SvgIcon";
import { fetchProjectAllStart } from "../store/actions/ProjectActions";
import Web3 from "web3";
import configuration from "react-global-configuration";
import { formatEther } from "@ethersproject/units";

const Projects = (props) => {
  const comingSoon = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    props.dispatch(fetchProjectAllStart());
    window.web3 = new Web3(window.ethereum);
  }, []);

  return (
    <>
      <div className="other_page_layouts">
        <section className="main-content-wrapper">
          <div className="container-fluid">
            <div className=" w-100 no-margin">
              {props.projects.loading ? (
                "loading"
              ) : (
                <>
                  {props.projects.data.opened_projects.length > 0 && (
                    <>
                      <header className="crumina-module crumina-heading heading--h1 heading--with-decoration align-flex-center">
                        <h1 className="medium-font-size weight-normal no-margin c-primary text-uppercase text-center ">
                          Projects Opened
                        </h1>
                      </header>
                      <div className="col-md-12 col-lg-12 no-padding medium-padding40">
                        <div className="row no-margin">
                          {props.projects.data.opened_projects.map(
                            (project, index) => (
                              <div
                                className="col-md-6 col-lg-4 col-sm-12 col-lg-12 no-padding d-flex"
                                key={index}
                              >
                                <div className="projectsWrapper">
                                  <div className="card-header">
                                    <Link
                                      to={`/single-project/${project.project_unique_id}`}
                                    >
                                      <img
                                        src={project.picture}
                                        alt={project.name}
                                      />
                                    </Link>
                                    <div className="social-contents">
                                      <Link
                                        to={`/single-project/${project.project_unique_id}`}
                                      >
                                        <h4 className="text-center">
                                          {project.name}
                                        </h4>
                                      </Link>
                                      <div className="social-icons">
                                        {project.facebook_link && (
                                          <a
                                            target="_blank"
                                            href={project.facebook_link}
                                          >
                                            <i className="fab fa-facebook woox-icon"></i>
                                          </a>
                                        )}
                                        {project.telegram_link && (
                                          <a
                                            target="_blank"
                                            href={project.telegram_link}
                                          >
                                            <i className="fab fa-telegram woox-icon"></i>
                                          </a>
                                        )}
                                        {project.twitter_link && (
                                          <a
                                            target="_blank"
                                            href={project.twitter_link}
                                          >
                                            <i className="fab fa-twitter woox-icon"></i>
                                          </a>
                                        )}
                                        {project.website && (
                                          <a
                                            target="_blank"
                                            href={project.website}
                                          >
                                            <i className="fab fa-dribbble woox-icon"></i>
                                          </a>
                                        )}
                                        {project.medium_link && (
                                          <a
                                            target="_blank"
                                            href={project.medium_link}
                                          >
                                            <i className="fab fa-medium woox-icon"></i>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    <div className="arrow">
                                      <SvgIcon
                                        id="icon-arrow-up"
                                        styles="woox-icon icon-up"
                                        hasPath={false}
                                      ></SvgIcon>
                                      <SvgIcon
                                        id="icon-arrow-down"
                                        styles="woox-icon icon-down"
                                        hasPath={false}
                                      ></SvgIcon>
                                    </div>
                                  </div>
                                  <Link
                                    to={`/single-project/${project.project_unique_id}`}
                                    className="card-body"
                                  >
                                    <p className="info-text common-margin">
                                      {project.description}
                                    </p>
                                    <div className="swap-infos common-margin">
                                      <div>
                                        <p className="text-capitalize">
                                          exchange rate
                                        </p>
                                        <p className="c-primary highligttext">
                                          1 {project.token_symbol} ={" "}
                                          {project.exchange_rate}{" "}
                                          {configuration.get(
                                            "configData.currency"
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex-center">
                                        <p className="text-capitalize">
                                          symbol
                                        </p>
                                        <p className="c-primary highligttext">
                                          {project.token_symbol}
                                        </p>
                                      </div>
                                      <div className="flex-end">
                                        <p className="text-capitalize">
                                          access
                                        </p>
                                        <p className="c-primary highligttext text-capitalize">
                                          {project.access_type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="project-progessbar">
                                      <div className="crumina-module crumina-skills-item skills-item--bordered no-margin">
                                        <div className="skills-item-info">
                                          <span className="progressbar-title">
                                            Progress
                                          </span>
                                        </div>
                                        <div className="skills-item-meter">
                                          <span
                                            className="skills-item-meter-active bg-primary-color"
                                            style={{
                                              width: `${
                                                (formatEther(
                                                  project.total_tokens_purchased
                                                ) /
                                                  project.ido_tokens) *
                                                  100 >
                                                100
                                                  ? 100
                                                  : (formatEther(
                                                      project.total_tokens_purchased
                                                    ) /
                                                      project.ido_tokens) *
                                                    100
                                              }%`,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="project-progress-status">
                                          <span>
                                            {project.total_tokens_purchased != 0
                                              ? `${(
                                                  (formatEther(
                                                    project.total_tokens_purchased
                                                  ) /
                                                    project.ido_tokens) *
                                                  100
                                                ).toFixed(2)}%`
                                              : "0.00%"}
                                          </span>
                                          <span>
                                            {`${Number(
                                              formatEther(
                                                project.total_tokens_purchased
                                              )
                                            ).toFixed(2)}`}{" "}
                                            {configuration.get(
                                              "configData.currency"
                                            )}
                                            / {project.ido_tokens_formatted}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {props.projects.data.closed_projects.length > 0 && (
                    <>
                      <header className="crumina-module crumina-heading heading--h1 heading--with-decoration align-flex-center medium-padding60 pb-0">
                        <h1 className="medium-font-size weight-normal no-margin c-primary text-uppercase text-center ">
                          Projects Closed
                        </h1>
                      </header>
                      <div className="col-md-12 col-lg-12 no-padding ">
                        <div className="row no-margin">
                          {props.projects.data.closed_projects.map(
                            (project, index) => (
                              <div
                                className="col-md-6 col-lg-4 col-sm-12 col-lg-12 no-padding d-flex "
                                key={index}
                              >
                                <div className="projectsWrapper">
                                  <div className="card-header">
                                    <Link
                                      to={`/single-project/${project.project_unique_id}`}
                                    >
                                      <img
                                        src={project.picture}
                                        alt={project.name}
                                      />
                                    </Link>
                                    <div className="social-contents">
                                      <Link
                                        to={`/single-project/${project.project_unique_id}`}
                                      >
                                        <h4 className="text-center">
                                          {project.name}
                                        </h4>
                                      </Link>
                                      <div className="social-icons">
                                        {project.facebook_link && (
                                          <a
                                            target="_blank"
                                            href={project.facebook_link}
                                          >
                                            <i className="fab fa-facebook woox-icon"></i>
                                          </a>
                                        )}
                                        {project.telegram_link && (
                                          <a
                                            target="_blank"
                                            href={project.telegram_link}
                                          >
                                            <i className="fab fa-telegram woox-icon"></i>
                                          </a>
                                        )}
                                        {project.twitter_link && (
                                          <a
                                            target="_blank"
                                            href={project.twitter_link}
                                          >
                                            <i className="fab fa-twitter woox-icon"></i>
                                          </a>
                                        )}
                                        {project.website && (
                                          <a
                                            target="_blank"
                                            href={project.website}
                                          >
                                            <i className="fab fa-dribbble woox-icon"></i>
                                          </a>
                                        )}
                                        {project.medium_link && (
                                          <a
                                            target="_blank"
                                            href={project.medium_link}
                                          >
                                            <i className="fab fa-medium woox-icon"></i>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    <div className="arrow">
                                      <SvgIcon
                                        id="icon-arrow-up"
                                        styles="woox-icon icon-up"
                                        hasPath={false}
                                      ></SvgIcon>
                                      <SvgIcon
                                        id="icon-arrow-down"
                                        styles="woox-icon icon-down"
                                        hasPath={false}
                                      ></SvgIcon>
                                    </div>
                                  </div>
                                  <Link
                                    to={`/single-project/${project.project_unique_id}`}
                                    className="card-body"
                                  >
                                    <p className="info-text common-margin">
                                      {project.description}
                                    </p>
                                    <div className="swap-infos common-margin">
                                      <div>
                                        <p className="text-capitalize">
                                          exchange rate
                                        </p>
                                        <p className="c-primary highligttext">
                                          1 {project.token_symbol} ={" "}
                                          {project.exchange_rate}{" "}
                                          {configuration.get(
                                            "configData.currency"
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex-center">
                                        <p className="text-capitalize">
                                          symbol
                                        </p>
                                        <p className="c-primary highligttext">
                                          {project.token_symbol}
                                        </p>
                                      </div>
                                      <div className="flex-end">
                                        <p className="text-capitalize">
                                          access
                                        </p>
                                        <p className="c-primary highligttext text-capitalize">
                                          {project.access_type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="project-progessbar">
                                      <div className="crumina-module crumina-skills-item skills-item--bordered no-margin">
                                        <div className="skills-item-info">
                                          <span className="progressbar-title">
                                            Progress
                                          </span>
                                        </div>
                                        <div className="skills-item-meter">
                                          <span
                                            className="skills-item-meter-active bg-primary-color"
                                            style={{
                                              width: `${
                                                (formatEther(
                                                  project.total_tokens_purchased
                                                ) /
                                                  project.ido_tokens) *
                                                  100 >
                                                100
                                                  ? 100
                                                  : (formatEther(
                                                      project.total_tokens_purchased
                                                    ) /
                                                      project.ido_tokens) *
                                                    100
                                              }%`,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="project-progress-status">
                                          <span>
                                            {project.total_tokens_purchased != 0
                                              ? `${(
                                                  (formatEther(
                                                    project.total_tokens_purchased
                                                  ) /
                                                    project.ido_tokens) *
                                                  100
                                                ).toFixed(2)}%`
                                              : "0.00%"}
                                          </span>
                                          <span>
                                            {`${Number(
                                              formatEther(
                                                project.total_tokens_purchased
                                              )
                                            ).toFixed(2)}`}{" "}
                                            {configuration.get(
                                              "configData.currency"
                                            )}
                                            / {project.ido_tokens_formatted}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {props.projects.data.upcoming_projects.length > 0 && (
                    <>
                      <header className="crumina-module crumina-heading heading--h1 heading--with-decoration align-flex-center  medium-padding60 pb-0">
                        <h1 className="medium-font-size weight-normal no-margin c-primary text-uppercase text-center ">
                          Upcoming Projects
                        </h1>
                      </header>
                      <div className="col-md-12 col-lg-12 no-padding ">
                        <div className="row no-margin">
                          {props.projects.data.upcoming_projects.map(
                            (project, index) => (
                              <div
                                className="col-md-6 col-lg-4 col-sm-12 col-lg-12 no-padding d-flex"
                                key={index}
                              >
                                <div className="projectsWrapper">
                                  <div className="card-header">
                                    <Link
                                      to={`/single-project/${project.project_unique_id}`}
                                    >
                                      <img
                                        src={project.picture}
                                        alt={project.name}
                                      />
                                    </Link>
                                    <div className="social-contents">
                                      <Link
                                        to={`/single-project/${project.project_unique_id}`}
                                      >
                                        <h4 className="text-center">
                                          {project.name}
                                        </h4>
                                      </Link>
                                      <div className="social-icons">
                                        {project.facebook_link && (
                                          <a
                                            target="_blank"
                                            href={project.facebook_link}
                                          >
                                            <i className="fab fa-facebook woox-icon"></i>
                                          </a>
                                        )}
                                        {project.telegram_link && (
                                          <a
                                            target="_blank"
                                            href={project.telegram_link}
                                          >
                                            <i className="fab fa-telegram woox-icon"></i>
                                          </a>
                                        )}
                                        {project.twitter_link && (
                                          <a
                                            target="_blank"
                                            href={project.twitter_link}
                                          >
                                            <i className="fab fa-twitter woox-icon"></i>
                                          </a>
                                        )}
                                        {project.website && (
                                          <a
                                            target="_blank"
                                            href={project.website}
                                          >
                                            <i className="fab fa-dribbble woox-icon"></i>
                                          </a>
                                        )}
                                        {project.medium_link && (
                                          <a
                                            target="_blank"
                                            href={project.medium_link}
                                          >
                                            <i className="fab fa-medium woox-icon"></i>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    <div className="arrow">
                                      <SvgIcon
                                        id="icon-arrow-up"
                                        styles="woox-icon icon-up"
                                        hasPath={false}
                                      ></SvgIcon>
                                      <SvgIcon
                                        id="icon-arrow-down"
                                        styles="woox-icon icon-down"
                                        hasPath={false}
                                      ></SvgIcon>
                                    </div>
                                  </div>
                                  <Link
                                    to={`/single-project/${project.project_unique_id}`}
                                    className="card-body"
                                  >
                                    <p className="info-text common-margin">
                                      {project.description}
                                    </p>
                                    <div className="swap-infos common-margin">
                                      <div>
                                        <p className="text-capitalize">
                                          exchange rate
                                        </p>
                                        <p className="c-primary highligttext">
                                          1 {project.token_symbol} ={" "}
                                          {project.exchange_rate}{" "}
                                          {configuration.get(
                                            "configData.currency"
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex-center">
                                        <p className="text-capitalize">
                                          symbol
                                        </p>
                                        <p className="c-primary highligttext">
                                          {project.token_symbol}
                                        </p>
                                      </div>
                                      <div className="flex-end">
                                        <p className="text-capitalize">
                                          access
                                        </p>
                                        <p className="c-primary highligttext text-capitalize">
                                          {project.access_type}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="project-progessbar">
                                      <div className="crumina-module crumina-skills-item skills-item--bordered no-margin">
                                        <div className="skills-item-info">
                                          <span className="progressbar-title">
                                            Progress
                                          </span>
                                        </div>
                                        <div className="skills-item-meter">
                                          <span
                                            className="skills-item-meter-active bg-primary-color"
                                            style={{
                                              width: `${
                                                (formatEther(
                                                  project.total_tokens_purchased
                                                ) /
                                                  project.ido_tokens) *
                                                  100 >
                                                100
                                                  ? 100
                                                  : (formatEther(
                                                      project.total_tokens_purchased
                                                    ) /
                                                      project.ido_tokens) *
                                                    100
                                              }%`,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="project-progress-status">
                                          <span>
                                          {project.total_tokens_purchased != 0
                                              ? `${(
                                                  (formatEther(
                                                    project.total_tokens_purchased
                                                  ) /
                                                    project.ido_tokens) *
                                                  100
                                                ).toFixed(2)}%`
                                              : "0.00%"}
                                          </span>
                                          <span>
                                          {`${Number(
                                              formatEther(
                                                project.total_tokens_purchased
                                              )
                                            ).toFixed(2)}`}{" "}
                                            {configuration.get(
                                              "configData.currency"
                                            )}
                                            / {project.ido_tokens_formatted}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  {props.projects.data.opened_projects.length == 0 &&
                    props.projects.data.closed_projects.length == 0 &&
                    props.projects.data.upcoming_projects.length == 0 && (
                      <>
                        <header className="crumina-module crumina-heading heading--h1 heading--with-decoration align-flex-center  medium-padding40">
                          <h1 className="medium-font-size weight-normal no-margin c-primary text-uppercase text-center ">
                            no projects, will be added soon
                          </h1>
                        </header>
                      </>
                    )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  projects: state.projectReducer.projects,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(Projects);
