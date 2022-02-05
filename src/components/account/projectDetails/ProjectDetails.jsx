import React from 'react'
import Details from './Details'
import Schedule from './Schedule'
import YourLocation from './YourLocation'

const ProjectDetails = () => {
  return (
    <>
      <div role="tabpanel" className="tab-pane fade" id="profile-details">
        <div className="row">
          <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb30">
            <div class="tabs tabs--style2 no-padding">
              <ul role="tablist">

                <li role="presentation" class="tab-control active">
                  <a href="#details" role="tab" data-toggle="tab" class="control-item">
                    <h6 class="tab-title">Details</h6>
                  </a>
                </li>

                <li role="presentation" class="tab-control">
                  <a href="#schedule" role="tab" data-toggle="tab" class="control-item">
                    <h6 class="tab-title">Schedule</h6>
                  </a>
                </li>

                <li role="presentation" class="tab-control">
                  <a href="#yourlocation" role="tab" data-toggle="tab" class="control-item">
                    <h6 class="tab-title">your location</h6>
                  </a>
                </li>

              </ul>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30">
              <div class="tab-content w-100 no-padding">
                <Details/>
                <Schedule/>
                <YourLocation/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDetails
