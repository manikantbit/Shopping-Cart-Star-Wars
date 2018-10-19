import React,{Component} from 'react';
import { formatPrice } from "../helpers";

// To display each product
class StarWar extends Component {
    myInput = React.createRef();
    render(){
        const { image, name, price, desc, status } = this.props.details;
        return (
            <div className="item">
            <li className="item-sub col-sm-12">
            <div className="col-sm-4">
            <img src={image} alt={name} className="img-responsive thumbnail img-menu"/>
            </div>
            <div className="col-sm-8">
            <div className="header-item">
               <h3>{name}</h3> 
            </div>
            <span className="price"><strong>{formatPrice(price)}</strong></span>
            <p>{desc}</p>
            <div className="quantity">
            <input type="number" ref = {this.myInput} id={this.props.index} name = {this.props.index} defaultValue='0' min='0' max='1000'/>
            </div>
            <button
            onClick={() => this.props.addToOrder(this.props.index,parseInt(this.myInput.value.value))}>
            Add To Cart
            </button>
            </div>
            </li>
            </div>
        )
    }
}
export default StarWar;