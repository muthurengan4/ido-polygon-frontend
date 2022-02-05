import React from "react";
import configuration from "react-global-configuration";

const SingleProjectDetails = (props) => {
  return (
    <>
      <div role="tabpanel" class="tab-pane fade active" id="single-details">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb30">
            <table>
              <thead>
                <tr>
                  <th className="text-capitalize ">Pool Information</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-capitalize ">Opens</td>
                  <td className="text-capitalize">
                    {props.singleProject.start_time_formatted}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Closes</td>
                  <td className="text-capitalize ">
                    {props.singleProject.end_time_formatted}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">status</td>
                  <td className="text-capitalize ">
                    {props.singleProject.publish_status_formatted}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Exchange Rates</td>
                  <td className="text-capitalize ">
                    1 {props.singleProject.token_symbol} ={" "}
                    {props.singleProject.exchange_rate}{" "}{configuration.get("configData.currency")}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Total Users Participated</td>
                  <td className="text-capitalize ">
                    {props.singleProject.total_users_participated}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Published by </td>
                  <td className="text-capitalize ">
                    {props.singleProject.user_displayname}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Created at </td>
                  <td className="text-capitalize ">
                    {props.singleProject.created_at}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Updated at </td>
                  <td className="text-capitalize ">
                    {props.singleProject.updated_at}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb30 ">
            <table>
              <thead>
                <tr>
                  <th className="text-capitalize ">Token Information</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-capitalize ">Project Name</td>
                  <td className="text-capitalize ">
                    {props.singleProject.name}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Token Symbol</td>
                  <td className="text-capitalize ">
                    {props.singleProject.token_symbol}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Total Supply</td>
                  <td className="text-capitalize ">
                    {props.singleProject.total_tokens_formatted}
                  </td>
                </tr>
                <tr>
                  <td className="text-capitalize ">Allowed Supply</td>
                  <td className="text-capitalize ">
                    {props.singleProject.allowed_tokens_formatted}
                  </td>
                </tr>
                {/* <tr>
                  <td className="text-capitalize ">Total Tokens</td>
                  <td className="text-capitalize ">
                    {props.singleProject.total_tokens_formatted}
                  </td>
                </tr> */}
                <tr>
                  <td className="text-capitalize ">Total Funds Swapped</td>
                  <td className="text-capitalize ">
                    {window.web3.utils
                      .fromWei(
                        props.singleProject.total_tokens_purchased,
                        "Ether"
                      )
                      .substring(0, 5)}{" "}
                    BUSD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProjectDetails;
