import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router'
import {fetchSinglePageStart} from '../store/actions/PageAction'
import { connect } from "react-redux";

const StaticPages = (props) => {

  const {id} = useParams();

  useEffect(() => {
    props.dispatch(fetchSinglePageStart({unique_id : id}))
  },[id])

  return (
    <>
      <div className="other_page_layouts">
        <section className="main-content-wrapper static-page-section">
          <div className="container">
            <div className=" w-100 no-margin">
              {props.pageData.loading ? "Loading..." : (
                <>
                  {id == "contact" && (
                    <h3 className="text-center">{props.pageData.data.title}</h3>
                  )}
                  <div dangerouslySetInnerHTML={{__html : props.pageData.data.description}}></div>
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
  pageData: state.page.pageData
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default  connect(mapStateToPros, mapDispatchToProps) (StaticPages)
