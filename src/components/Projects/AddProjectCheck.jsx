import React,{useState , useEffect} from 'react'
import Select from 'react-select'

const AddProjectContractCheck = (props) => {

  const {status} = props;

  const [selectedCrypto , setSelectedCrypto] = useState(null);

  const [largeDescripiton , setLargeDescription] = useState({
    content: "",
  })

  const options = [
    { value: 'bitcoin', label: 'bitcoin' },
    { value: 'monero', label: 'monero' },
    { value: 'polygon', label: 'polygon' }
  ]

  const styles = {
    control: base => ({
      ...base,
        borderColor: "#0f1114",
        color: "#a0a9ba",
        backgroundColor: "#0f1114",

      "&:hover": {
        borderColor: "#0f1114",
        color: "red",
        backgroundColor: "#0f1114"
      }
    }),
    dropdownIndicator: base => ({
      ...base,
      color: "#ffba00"
    }),
    singleValue: base => ({
      ...base,
      color: "#ffba00"
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? "#0f1114"
          : isFocused
          ? "rgba(255,186,0,0.3)"
          : null,

        color: isSelected ?"#ffba00" : "#a0a9ba",

        "&:hover": {
          color: "#ffba00",
        },
  
        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? "rgba(255,186,0,0.3)" : "rgba(255,186,0,0.3)"),
          color: "#ffba00"
        },
      };
    },
  };

  const handleCurrencySelect = (selectedOption) => {
    setSelectedCrypto( selectedOption.value)
  }

  useEffect(() => {
    if(status){
      document.body.classList.add("noBodyOverflow");
    }else{
      document.body.classList.remove("noBodyOverflow");
    }
  },[status])

  return (
    <>
      <div id="authModal" className={`overflow-y-scroll ${status ? "show" : ""}`} >
        <div className="authModalWrapper no-padding">
          {status && (
            <div className="wrapper" onClick={() => props.handleAddProjectCheckModal(null)}></div>
          )}
           <div className={`modal-body addProject-modal col-lg-8 col-md-8 col-xs-11 col-sm-11 ${status ? "show" : ""}`}>
            <div className="outside-scroll" onClick={() => props.handleAddProjectCheckModal(null)} ></div>
              <form method="get" className="form--search form--search-transparent w-100 mt-4 mb-4">
                <div className="row no-margin w-100 align-items-center checkcontractWrapper">
                  <div className="w-100 col-lg-12 col-md-12 col-xs-12 no-padding">
                    <p className="mt-0 mb-3 text-capitalize"> <span className="custom-required text-bold ">NOTE</span> : check contract to add new project</p>
                  </div>
                  <div className="col-lg-8 makesameheight col-md-12 col-sm-12 col-xs-12 mb30 no-padding">
                    <label htmlFor="picture" className="custom-label ml-0 text-capitalize">contract address</label>
                    <input
                      id="picture"
                      className="no-padding"
                      name="contract_address"
                      placeholder="Contract Address"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-4 makesameheight col-md-12 col-sm-12 col-xs-12">
                    <button
                      type="button"
                      className="btn btn--large btn--transparent btn--primary"
                    >Check Contract</button>
                  </div>
                </div>
                <div className="row no-margin w-100 align-items-center checkcontractWrapper">
                  <div className="w-100 col-lg-12 col-md-12 col-xs-12 no-padding">
                    <p className="mt-0 mb-3 text-capitalize"> <span className="custom-required text-bold ">NOTE</span> : Please select currency</p>
                  </div>
                  <div className="select-wrapper w-100 mb-3 mt-3">
                    <Select options={options} styles={styles} onChange={handleCurrencySelect}/>
                  </div> 
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb30 no-padding mt-3">
                    <textarea
                      id="desc"
                      className="no-padding height-100p"
                      name="description"
                      placeholder="Description"
                      type="text"
                      onChange={(event) => setLargeDescription({...largeDescripiton , content : event.target.value})}
                      value={largeDescripiton.content}
                    />
                  </div>
                  <div className="col-lg-4 makesameheight col-md-12 col-sm-12 col-xs-12">
                    <button
                      type="button"
                      className="btn btn--medium btn--transparent btn--primary"
                      onClick={props.handleSwitchModal}
                      disabled={props.contractIsValid && selectedCrypto != null ? false : true }
                    >Continue</button>
                  </div>
                </div>
              </form>
           </div>
        </div>
      </div>
    </>
  )
}

export default AddProjectContractCheck
