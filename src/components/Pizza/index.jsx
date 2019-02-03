import React from 'react';

import { connect } from 'react-redux';
import { css } from 'emotion';

import { toggleTopping, removePizza } from '../../redux/actions';
import Topping from './Topping';
import Icon from './Icon';

class Pizza extends React.Component {
  onClickRemove = event => {
    this.props.removePizza();
  };

  onChangeTopping = topping => event => {
    const { maxToppings, totalSelected } = this.props.pizza;

    if (!maxToppings) {
      this.props.toggleTopping(topping.name);
    } else if(totalSelected < maxToppings || topping.selected) {
      this.props.toggleTopping(topping.name);
    }
  };

  renderToppings() {
    const { maxToppings, totalSelected } = this.props.pizza;

    return this.props.pizza.toppings.map(topping => (
      <Topping
        key={topping.name}
        name={topping.name}
        selected={topping.selected}
        onChange={this.onChangeTopping(topping)}
        disabled={totalSelected === maxToppings && !topping.selected}
      />
    ));
  }

  render() {
    return (
      <article className="nes-container">
        <Icon onClick={this.onClickRemove} />

        <h2>{this.props.pizza.name}</h2>

        <h3>Toppings:</h3>
        <form>{this.renderToppings()}</form>

        <h3 className={totalStyle}>${this.props.pizza.price.toFixed(2)}</h3>
      </article>
    );
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    toggleTopping: name => dispatch(toggleTopping(ownProps.id, name)),
    removePizza: () => dispatch(removePizza(ownProps.id)),
  };
}

export default connect(
  null,
  mapDispatch
)(Pizza);

const totalStyle = css({
  textAlign: 'right',
});
