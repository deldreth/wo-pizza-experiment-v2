import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

import { toggleTopping, removePizza } from '../redux/actions';

class Pizza extends React.Component {
  onClickRemove = event => {
    this.props.removePizza(this.props.id);
  };

  onChangeTopping = topping => event => {
    if (
      !this.props.pizza.maxToppings ||
      (this.props.pizza.totalSelected <
        this.props.pizza.maxToppings ||
        topping.selected)
    ) {
      this.props.toggleTopping(this.props.id, topping.name);
    }
  };

  renderToppings() {
    const toppings = [];

    for (const topping of this.props.pizza.toppings) {
      toppings.push(
        <Topping
          key={topping.name}
          disabled={
            this.props.pizza.totalSelected === this.props.pizza.maxToppings && !topping.selected
          }
        >
          <input
            type="checkbox"
            className="nes-checkbox"
            onChange={this.onChangeTopping(topping)}
            checked={topping.selected}
          />
          <span>{topping.name}</span>
        </Topping>
      );
    }

    return toppings;
  }

  render() {
    return (
      <article className="nes-container">
        <Icon onClick={this.onClickRemove} />

        <h2>{this.props.pizza.name}</h2>

        <h3>Toppings:</h3>
        <form>{this.renderToppings()}</form>

        <Total>${this.props.pizza.price.toFixed(2)}</Total>
      </article>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    toggleTopping: (index, name) => dispatch(toggleTopping(index, name)),
    removePizza: index => dispatch(removePizza(index)),
  };
}

export default connect(
  null,
  mapDispatch
)(Pizza);

const Topping = styled('label')`
  display: block;
  opacity: ${props => (!props.disabled ? 1 : 0.5)};
`;

const Total = styled('h3')`
  text-align: right;
`;

const Icon = styled('div').attrs({ className: 'nes-icon close is-small' })`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: #ffffff;
`;
