import React,{useState , useEffect} from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import {fetchSingleOwnProjectsStart} from '../store/actions/ProjectActions'
import { useParams , useHistory} from 'react-router';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { addProjectStart } from '../store/actions/ProjectActions'
import { Link } from 'react-router-dom';

var today = new Date();
today.setDate(today.getDate());

const now = new Date();
const disablePrevious = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

const yesterdayBegin = new Date(Date.UTC(0, 0, 0, 0, 0, 0));
const todayNoon = new Date(Date.UTC(0, 0, 0, 0, 0, 0));

const EditProject = (props) => {

  const {id} = useParams();

  const history = useHistory();

  const [projectInputDetails , setProjectInputDetails] = useState({})

  useEffect(() => {
    props.dispatch(fetchSingleOwnProjectsStart({project_unique_id : id}))
  },[])

  useEffect(() => {
    if(!props.editProject.loading){

      // converting date and time to timestamp for calender do not edit 

      const startTime = moment(props.editProject.data.project.start_time).format("DD,MM,YYYY,HH,mm,ss,a");

      const endTime = moment(props.editProject.data.project.end_time).format("DD,MM,YYYY,HH,mm,ss");

      const startTimeArray = startTime.split(',');
      const endTimeArray = endTime.split(',')
      const offset = new Date().getTimezoneOffset() / -60;
      const offsetArray = offset.toString().split('.');

      const offsetHour = parseInt(offsetArray[0]) ;

      const offsetMinute = parseInt(offsetArray[1]) * 6 ;

      const startTimeStamp = new Date(Date.UTC(startTimeArray[2], startTimeArray[1], startTimeArray[0], startTimeArray[3] - offsetHour ,  startTimeArray[4] - offsetMinute ))

      const endTimeStamp = new Date(Date.UTC(endTimeArray[2], endTimeArray[1], endTimeArray[0], endTimeArray[3] - offsetHour , endTimeArray[4] - offsetMinute,))

      setProjectInputDetails({
        name : props.editProject.data.project.name,
        total_tokens: props.editProject.data.project.total_tokens,
        allowed_tokens: props.editProject.data.project.allowed_tokens,
        exchange_rate: props.editProject.data.project.exchange_rate,
        token_symbol : props.editProject.data.project.token_symbol,
        picture : props.editProject.data.project.picture,
        description : props.editProject.data.project.description,
        decimal_points : props.editProject.data.project.decimal_points,
        contract_address : props.editProject.data.project.contract_address,
        website : props.editProject.data.project.website,
        twitter_link : props.editProject.data.project.twitter_link,
        facebook_link : props.editProject.data.project.facebook_link,
        telegram_link : props.editProject.data.project.telegram_link,
        medium_link : props.editProject.data.project.medium_link,
        start_time :  startTime,
        end_time : endTime,
        project_id : props.editProject.data.project.project_id,
        picture : props.editProject.data.project.picture
      });

      onChange([startTimeStamp , endTimeStamp])
    }
  },[props.editProject.loading])

  useEffect(() => {

    // redirect after edit success

    if(props.addProject.editStatus){
      history.push({
        pathname : "/account/profile",
        state : {
          activeIndex : 4
        }
      })
    }

  },[props.addProject.loading])

  const hanldeProjectInputDetails = (event) => {
    setProjectInputDetails({
      ...projectInputDetails,
      [event.target.name] : event.target.value
    })
  }

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setProjectInputDetails({
        ...projectInputDetails,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });

      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const [value, onChange] = useState([yesterdayBegin, todayNoon]);

  const handleEditProject = () => {

    const startTime = moment(value[0]).format("DD-MM-YYYY HH:MM:SS");
    const endTime = moment(value[1]).format("DD-MM-YYYY  HH:MM:SS");

    const newProjectDetails = {...projectInputDetails ,  start_time : startTime ,end_time : endTime }

    props.dispatch(addProjectStart(newProjectDetails))
  }

  return (
    <>
      <div className="other_page_layouts">
        <section className="main-content-wrapper">
          <div className="container-fluid">
            <div className="row w-100 no-margin">
              <div className="makeit-center no-padding col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="col-lg-11 col-md-11 col-xs-12 col-sm-12 no-padding">
                  <div className="EditprojectWrapper">
                    <div className="headerwrapper">
                      <h4 className="text-center text-capitalize">Edit Project</h4>
                    </div>
                    <form method="get" className="form--search form--search-transparent w-100 mt-4 mb-4">
                    {props.editProject.loading ? "loading" : (
                      <>
                        <div className="row">
                          {/* <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                              <label htmlFor="username" className="custom-label mb-3 ml-0 text-capitalize">user name *</label>
                              <input
                                id="username"
                                className=" no-padding"
                                name="name" 
                                placeholder="username"
                                type="text"
                                onChange={(event) => hanldeProjectInputDetails(event)}
                                value={projectInputDetails.name}
                              />
                            </div> */}
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                            <label htmlFor="ProjectName" className="custom-label ml-0 text-capitalize">Project Name *</label>
                            <input
                              id="ProjectName"
                              className="no-padding"
                              name="name" 
                              placeholder="Project Name"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.name}
                            />
                          </div>
                          {/* <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label className="custom-label ml-0 text-capitalize">access type *</label>
                            <div className="AccessTypeWrapper d-flex">
                              <div class="radio mb-0">
                                <label className="text-capitalize">
                                  <input type="radio" name="accessType" />
                                  <span class="circle"></span><span class="check"></span>
                                  Public
                                </label>
                              </div>
                              <div class="radio ml-3 mb-0">
                                <label className="text-capitalize">
                                  <input type="radio" name="accessType" />
                                  <span class="circle"></span><span class="check"></span>
                                  private
                                </label>
                              </div>
                            </div>
                          </div> */}
                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                            <label htmlFor="date" className="custom-label ml-0  text-capitalize">Start & End Date</label>
                            <div id="customReactDateTimeCalender" className="w-100">
                              <DateTimeRangePicker
                                onChange={onChange}
                                value={value}
                                format={"dd-M-y h:mm:s a"}
                                minDate={disablePrevious}
                              />
                              </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30 addproject-between">
                            <label htmlFor="TotalTokens" className="custom-label ml-0  text-capitalize">Total Tokens</label>
                            <input
                              id="TotalTokens"
                              className="no-padding"
                              name="total_tokens" 
                              placeholder="Total Tokens"
                              type="number"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.total_tokens}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="AllowedTokens" className="custom-label ml-0 text-capitalize">Allowed Tokens</label>
                            <input
                              id="number"
                              className="no-padding"
                              name="allowed_tokens" 
                              placeholder="Allowed Tokens"
                              type="number"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.allowed_tokens}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="ExchangeRate" className="custom-label ml-0 text-capitalize">Exchange Rate</label>
                            <input
                              id="ExchangeRate"
                              className="no-padding"
                              name="exchange_rate" 
                              placeholder="Exchange Rate"
                              type="number"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.exchange_rate}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="TokenSymbol" className="custom-label ml-0 text-capitalize">Token Symbol</label>
                            <input
                              id="TokenSymbol"
                              className="no-padding"
                              name="token_symbol" 
                              placeholder="Token Symbol"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.token_symbol}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="picture" className="custom-label ml-0 text-capitalize">Select Picture</label>
                            <input
                              id="picture"
                              className="no-padding"
                              name="picture" 
                              placeholder="Select Picture"
                              type="file"
                              accept="image/*"
                              onChange={(event) => handleChangeImage(event)}
                            />
                          </div>
                          <div className="col-lg-4 makesameheight col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="picture" className="custom-label ml-0 text-capitalize">Decimal Points</label>
                            <input
                              id="picture"
                              className="no-padding"
                              name="decimal_points"
                              placeholder="Decimal Points"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.decimal_points}
                            />
                          </div>
                          <div className="col-lg-8 makesameheight col-md-12 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="picture" className="custom-label ml-0 text-capitalize">contract address</label>
                            <input
                              id="picture"
                              className="no-padding"
                              name="contract_address"
                              placeholder="Contract Address"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.contract_address}
                            />
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30">
                              <label htmlFor="desc" className="custom-label ml-0 text-capitalize">Description</label>
                              <textarea
                                id="desc"
                                className="no-padding"
                                name="description" 
                                placeholder="Description"
                                type="text"
                                onChange={(event) => hanldeProjectInputDetails(event)}
                                value={projectInputDetails.description}
                                row={4}
                              />
                          </div>
                      </div>
                      <h5 className="text-muted text-capitalize mt-3 mb-3 letter-2">Social Settings (Optional)</h5>
                      <div className="custom-hr"></div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="Website" className="custom-label mb-3 ml-0 text-capitalize">Website</label>
                            <input
                              id="Website"
                              className=" no-padding"
                              name="website" 
                              placeholder="Website"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.website}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="TelegramLink" className="custom-label mb-3 ml-0 text-capitalize">Telegram Link</label>
                            <input
                              id="TelegramLink"
                              className=" no-padding"
                              name="telegram_link" 
                              placeholder="Telegram Link"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.telegram_link}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="Medium" className="custom-label mb-3 ml-0 text-capitalize">Medium Link</label>
                            <input
                              id="Medium"
                              className=" no-padding"
                              name="medium_link" 
                              placeholder="Medium Link"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.medium_link}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="Facebook" className="custom-label mb-3 ml-0 text-capitalize">Facebook Link</label>
                            <input
                              id="Facebook"
                              className=" no-padding"
                              name="facebook_link" 
                              placeholder="Facebook Link"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.facebook_link}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb30">
                            <label htmlFor="Twitter" className="custom-label mb-3 ml-0 text-capitalize">Twitter Link</label>
                            <input
                              id="Twitter"
                              className=" no-padding"
                              name="twitter_link" 
                              placeholder="Twitter Link"
                              type="text"
                              onChange={(event) => hanldeProjectInputDetails(event)}
                              value={projectInputDetails.twitter_link}
                            />
                          </div>
                      </div>
                        <div className="buttoncancelsavewrapper mt-3">
                          <Link className="btn btn--medium btn--transparent btn--primary text-capitalize" to={"/account/own-projects"}>cancel</Link>
                          <button 
                            type="button" 
                            className="btn btn--medium btn--primary text-capitalize" 
                            onClick={handleEditProject}
                            disabled={props.addProject.buttonDisable}
                          >
                            {props.addProject.loadingButtonContent !== null
                              ? props.addProject.loadingButtonContent
                              : "save"} 
                          </button>
                        </div>
                      </>
                    )}
                    </form>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const mapStateToPros = (state) => ({
  editProject: state.projectReducer.editProject,
  addProject: state.projectReducer.addProject,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros , mapDispatchToProps) (EditProject)
