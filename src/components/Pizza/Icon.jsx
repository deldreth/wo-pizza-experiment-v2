import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

function Icon(props) {
  return (
    <div
      className={cx(['nes-icon close is-small', iconStyle])}
      onClick={props.onClick}
    />
  );
}

Icon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default memo(Icon);

const iconStyle = css({
  position: 'absolute',
  top: '1.5rem',
  right: '2rem',
  color: '#FFFFFF',
});
