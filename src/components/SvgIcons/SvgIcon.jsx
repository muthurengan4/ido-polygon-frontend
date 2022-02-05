import React from 'react';
import Icons from './SvgIcons.svg';
import PropTypes from 'prop-types';

const SvgIcon = ({ id , styles , hasPath }) => {
  return (
    <>
       <svg className={styles}>
        <use xlinkHref={hasPath ? `${Icons}#${id}` : `#${id}`} />
      </svg>
    </>
  )
}

SvgIcon.prototype = {
  id: PropTypes.string.isRequired,
  styles : PropTypes.string
}

export default SvgIcon
