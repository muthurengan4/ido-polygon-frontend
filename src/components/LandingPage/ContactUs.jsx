import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { contactUsStart } from "../store/actions/UserAction";


const ContactUs = (props) => {


    const [inputData, setInputData] = useState({
        title: "",
        name: "",
        email: "",
        telegram_link: "",
        description: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(contactUsStart(inputData))
    }

    return (
        <>
            <div className="contact-us-sec">
                <div className="container">
                    <h2>Contact Us</h2>
                    <p>Fill in the form below and our team will get in touch with you!</p>
                    <div className="row no-margin">
                        <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                            <div className="contact-us-img-sec">
                                <img
                                    src={window.location.origin + "/assets/img/busdx-logo.png"}
                                    alt="Contact Us"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                            <form onSubmit={handleSubmit}>
                                <div className="contact-us-form-sec">
                                    <div className="form-group">
                                        <label
                                            className="custom-label ml-0 text-capitalize"
                                        >
                                            Title
                                        </label>
                                        <input type="text" className="form-control" placeholder="title" name="title" onChange={(event) => setInputData({
                                            ...inputData,
                                            title: event.target.value
                                        })} required />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="custom-label ml-0 text-capitalize"
                                        >
                                            Name
                                        </label>
                                        <input type="text" className="form-control" placeholder="Name" name="name" onChange={(event) => setInputData({
                                            ...inputData,
                                            name: event.target.value
                                        })} required />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="custom-label ml-0 text-capitalize"
                                        >
                                            Email
                                        </label>
                                        <input type="email" className="form-control" placeholder="Email" name="email" onChange={(event) => setInputData({
                                            ...inputData,
                                            email: event.target.value
                                        })} required />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="custom-label ml-0 text-capitalize"
                                        >
                                            Telegram Link
                                        </label>
                                        <input type="text" className="form-control" placeholder="Telegram Link" name="telegram_link" onChange={(event) => setInputData({
                                            ...inputData,
                                            telegram_link: event.target.value
                                        })} required />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            className="custom-label ml-0 text-capitalize"
                                        >
                                            Description
                                        </label>
                                        <textarea type="text" className="form-control" placeholder="Description" name="description" onChange={(event) => setInputData({
                                            ...inputData,
                                            description: event.target.value
                                        })} rows="4" />
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn--medium  btn--transparent btn--primary text-capitalize secondry-button" type="submit" disabled={props.contact.loadingButtonContent != null ? true : false}>
                                            {props.contact.loadingButtonContent != null ? props.contact.loadingButtonContent : "Submit"}
                                            
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToPros = (state) => ({
    contact: state.users.contactUs,
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(ContactUs);

