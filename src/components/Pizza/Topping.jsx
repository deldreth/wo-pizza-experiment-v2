import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { css, cx } from 'emotion';

function Topping(props) {
  return (
    <label
      className={cx([
        toppingStyle,
        css({
          opacity: props.disabled ? 0.25 : 1,
        }),
      ])}
    >
      <input
        type="checkbox"
        className="nes-checkbox"
        onChange={props.onChange}
        checked={props.selected}
      />
      <span>{props.name}</span>
    </label>
  );
}

Topping.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default memo(Topping);

const toppingStyle = css({
  display: 'block',
});
