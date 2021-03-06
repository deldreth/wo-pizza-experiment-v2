import React, { memo } from 'react';

import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { css, cx } from 'emotion';

import { QUERY_PIZZA_SIZES } from '../graphql/queries';
import { asyncAddPizza } from '../redux/actions';

function Select(props) {
  return (
    <Query query={QUERY_PIZZA_SIZES}>
      {({ data, loading, error }) => (
        <div
          className={cx([
            'nes-container',
            'with-title',
            css({ display: 'inline-block' }),
          ])}
        >
          <h2 className="title">Select a size</h2>
          {loading && 'Fetching pizza sizes...'}
          {error && 'Could not get pizza sizes...'}

          {data.pizzaSizes &&
            data.pizzaSizes.map(pizza => (
              <Button
                key={pizza.name}
                name={pizza.name}
                onClick={() => props.addPizza(pizza.name)}
              />
            ))}
        </div>
      )}
    </Query>
  );
}

function mapDispatch(dispatch) {
  return {
    addPizza: name => dispatch(asyncAddPizza(name)),
  };
}

export default connect(
  null,
  mapDispatch
)(Select);

const Button = memo(function(props) {
  return (
    <button
      onClick={props.onClick}
      className={cx(['nes-btn', css({ margin: '0px 1rem' })])}
    >
      {props.name}
    </button>
  );
});
