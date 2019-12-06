import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Item extends React.Component {
    render() {
	return (
	    <tr>
	    <td>{this.props.name}</td>
	    <td>16.99</td>
	    <td>None</td>
	    <td>None</td>
	    <td><button onClick={this.props.addToCart}>Add To Cart</button></td>
	    </tr>
	);
    }
}

class Store extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    productList: ["Basketball", "Baseball", "Football", "Basketball", "Lacrosse Stick"],
	    shoppingCart: []
	};
    }

    addProduct = () => {
	const productList = this.state.productList.slice();
	productList.push("Foobar");
	this.setState({productList: productList});
    }

    addToCart = () => {
	const shoppingCart = this.state.shoppingCart.slice();
	shoppingCart.push("Foobar");
	this.setState({shoppingCart: shoppingCart});
    }

    createProductList = () => {
	let products = [];
	let idx;

	for (idx = 0; idx < this.state.productList.length; idx++) {
	    products.push(
		<Item
		name={this.state.productList[idx]}
		addToCart={() => this.addToCart()}
		/>);
	}

	return products
    }

    createShoppingCart = () => {
	let products = [];
	let idx;

	for (idx = 0; idx < this.state.shoppingCart.length; idx++) {
	    products.push(
		<Item
		name={this.state.shoppingCart[idx]}
		addToCart={() => this.addToCart()}
		/>);
	}

	return products
    }

    render() {
	return (
	    <div className="container">
	    <div className="flex-item">
	    <table>
	    <thead>
	    <tr>
	    <th>Item Name</th>
	    <th>Price</th>
	    <th>Sale Price</th>
	    <th>Max Quantity</th>
	    <th>Buy</th>
	    </tr>
	    </thead>
	    <tbody>

	    {this.createProductList()}

	    </tbody>
	    </table>
	    <button onClick={this.addProduct}>Add</button>
	    </div>
	    <div className="flex-item">
	    <table>
	    <thead>
	    <tr>
	    <th>Item Name</th>
	    <th>Price</th>
	    <th>Sale Price</th>
	    <th>Max Quantity</th>
	    <th>Buy</th>
	    </tr>
	    </thead>
	    <tbody>

	    {this.createShoppingCart()}

	    </tbody>
	    </table>
	    </div>
	    </div>
	);
    }
}

// ========================================

ReactDOM.render(
    <Store />,
    document.getElementById('root')
);
