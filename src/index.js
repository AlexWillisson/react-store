import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import uuid from 'react-uuid'

class Product extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    key: this.props.productDetails.key,
	    name: this.props.productDetails.name,
	    price: this.props.productDetails.price,
	    salePrice: this.props.productDetails.salePrice,
	    maxQuantity: this.props.productDetails.maxQuantity,
	    addToCart: this.props.addToCart
	}
    }

    render() {
	return (
	    <tr>
	    <td>{this.state.name}</td>
	    <td>{this.state.price}</td>
	    <td>{this.state.salePrice}</td>
	    <td>{this.state.maxQuantity}</td>
	    <td><button onClick={this.state.addToCart}>Add To Cart</button></td>
	    </tr>
	);
    }
}

class Store extends React.Component {
    constructor(props) {
	super(props);

	const initialProducts = [
	    {
		key: uuid(),
		name: "Basketball",
		price: 16.99,
		salePrice: null,
		maxQuantity: null
	    },
	    {
		key: uuid(),
		name: "Baseball",
		price: 6.49,
		salePrice: 5.99,
		maxQuantity: null
	    },
	    {
		key: uuid(),
		name: "Football",
		price: 20.00,
		salePrice: 10.00,
		maxQuantity: 4
	    },
	    {
		key: uuid(),
		name: "Basketball",
		price: 16.99,
		salePrice: 12.99,
		maxQuantity: 1
	    },
	    {
		key: uuid(),
		name: "Lacrosse Stick",
		price: 39.99,
		salePrice: null,
		maxQuantity: null
	    }
	]

	let keyedProductList = {}

	initialProducts.forEach(product => keyedProductList[product.key] = product);

	this.state = {
	    productList: initialProducts,
	    keyedProductList: Object.assign({}, keyedProductList),
	    shoppingCart: []
	};

	console.log("Hi Zak/AbbVie,\n\nTo be honest I just learned React. Decided to put my time into building the challenge since this error wasn't clear what it meant and I didn't want to burn all my time on it");
    }

    addProduct = () => {
	// Yes this is inefficient. Going for immutability over runtime here
	let productList = this.state.productList.slice();
	let keyedProductList = Object.assign({}, this.state.keyedProductList);

	const newProduct = {
	    key: uuid(),
	    name: "Sparx Skate Sharpener",
	    price: 399.99,
	    salePrice: null,
	    maxQuantity: null
	};
	productList.push(newProduct);
	keyedProductList[newProduct.key] = newProduct

	this.setState({productList: productList.slice(),
		       keyedProductList: Object.assign({}, keyedProductList)});
    }

    addToCart = (key) => {
	const shoppingCart = this.state.shoppingCart.slice();
	shoppingCart.push(this.state.keyedProductList[key]);
	this.setState({shoppingCart: shoppingCart});
    }

    createProductList = () => {
	let products = [];
	let idx;

	for (idx = 0; idx < this.state.productList.length; idx++) {
	    let product = this.state.productList[idx]

	    products.push(
		<Product
		productDetails={product}
		addToCart={() => this.addToCart(product.key)}
		/>);
	}

	return products
    }

    createShoppingCart = () => {
	let products = [];
	let idx;

	for (idx = 0; idx < this.state.shoppingCart.length; idx++) {
	    products.push(
		<Product
		productDetails={this.state.shoppingCart[idx]}
		delFromCart={() => this.delFromCart()}
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
