import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { css } from 'emotion';

import Pizza from './Pizza';

function Cart(props) {
  return (
    <Fragment>
      <section className="nes-container with-title">
        <h3 className="title">Pizzas</h3>

        <section className={cartGridStyle}>
          {/* {Object.keysprops.pizzas.length === 0 && 'Pick a size'} */}

          {Object.keys(props.pizzas).map(id => (
            <Pizza key={id} id={id} pizza={props.pizzas[id]} />
          ))}
        </section>
      </section>

      <h1 className={css(`text-align: right`)}>
        ${props.total}
      </h1>
    </Fragment>
  );
}

function mapState(state) {
  return {
    pizzas: state.pizzas,
    total: state.total
  };
}

export default connect(mapState)(Cart);

const cartGridStyle = css(`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1399px) {
    grid-template-columns: repeat(4, 1fr);
  }
`);
