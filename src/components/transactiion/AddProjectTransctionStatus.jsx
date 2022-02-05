import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetAddProjectData,resetSendAdminTokenData } from "../store/actions/ProjectActions";

const AddProjectTransctionStatus = (props) => {
  const { state } = useLocation();

  const history = useHistory();

  useEffect(() => {
    props.dispatch(resetAddProjectData())
    props.dispatch(resetSendAdminTokenData())
  },[])

  return (
    <>
      <div className="other_page_layouts">
        <section className="main-content-wrapper confirmation-page">
          <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center  flex-column">
              {state.data.status == 0 ? (
                <>
                  <h3 className="text-center text-bold letter-2 text-capitalize">
                    Transaction <span className="c-primary">successful</span>{" "}
                  </h3>
                  <svg
                    id="confirm_check"
                    x="0px"
                    y="0px"
                    className="mt-5 mb-5"
                    viewBox="0 0 60 60"
                  >
                    <path
                      className="confirmation-check"
                      d="M40.61,23.03L26.67,36.97L13.495,23.788c-1.146-1.147-1.359-2.936-0.504-4.314
                    c3.894-6.28,11.169-10.243,19.283-9.348c9.258,1.021,16.694,8.542,17.622,17.81c1.232,12.295-8.683,22.607-20.849,22.042
                    c-9.9-0.46-18.128-8.344-18.972-18.218c-0.292-3.416,0.276-6.673,1.51-9.578"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <div className="failed-state">
                    <h3 className="text-center text-bold letter-2 text-capitalize">
                      Transaction <span className="failed">Failed</span>{" "}
                    </h3>
                    <svg class="cross__svg" viewBox="0 0 52 52">
                      <circle
                        class="cross__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />
                      <path
                        class="cross__path cross__path--right"
                        fill="none"
                        d="M16,16 l20,20"
                      />
                      <path
                        class="cross__path cross__path--right"
                        fill="none"
                        d="M16,36 l20,-20"
                      />
                    </svg>
                  </div>
                </>
              )}
              <Link
                to={"/account/own-projects"}
                className="btn btn--large btn--transparent btn--primary"
                // onClick={() =>
                //   history.push({
                //     pathname: "/account/own-projects",
                //   })
                // }
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  addProject: state.projectReducer.addProject,
  sendProTokenAdmin: state.projectReducer.sendProTokenAdmin,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros , mapDispatchToProps)(AddProjectTransctionStatus);
