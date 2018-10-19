import React from 'react';
import { formatPrice } from "../helpers";

class Order extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          isTop: true
        };
        this.onScroll = this.onScroll.bind(this);
      }
    // Order Section to be fixed on scroll
      componentDidMount() {
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 180;
          if (isTop !== this.state.isTop) {
            this.onScroll(isTop);
          }
        });
      }
    
      onScroll(isTop) {
        this.setState({ isTop });
      }
    // Order (Cart) Render function
    renderOrder = key => {
        const product = this.props.starwars[key];
        const count = this.props.order[key];
        return (
            <li key={key} style={{position:'relative'}}>
            <input type="number" className={"order"+key} onChange={this.props.changeOrder.bind(this,key)} id={this.props.index} value={count} min='1' max='1000'/>  
            {product.name}      
            <span style={{marginRight: '40px'}}>
            {formatPrice(count * product.price)}
            </span>
            <button onClick={() => this.props.removeFromOrder(key)} style={{position: 'absolute',top:"3px",right:"2px"}}>
              &times;
            </button>
        </li>
        );
    }
    // Calculation of Discounts and Total Price
    render(){
        let dvdTotal = 0, rayTotal = 0, discount=[];
        let dvd = new Set();
        let blueray = new Set();

        for(let movie in this.props.starwars){
            if(movie.indexOf('dvd')!==-1){
                dvd.add(movie)
            }else{
                blueray.add(movie)
            }
        }
        let sum = 0;
        const orderIds = Object.keys(this.props.order);
        let total = orderIds.reduce((prevTotal,key) => { 
            const product = this.props.starwars[key];
            const count = this.props.order[key];
            if(product.type ==="DVD"){
                dvdTotal+= count*product.price;
                dvd.delete(key)
            }else {
                rayTotal+= count*product.price;
                blueray.delete(key)
            }
            //All DVD items are present, adding discount for DVD
            if(dvd.size ===0 && key.indexOf('dvd')!==-1){
                let dvdDiscount = dvdTotal*0.1;
                dvdTotal -= dvdDiscount;
                discount.push((
                    <div className="discount">
                        Discount (DVD):10%
                        <span><strong>{formatPrice(dvdDiscount)}</strong></span>
                    </div>
                ))
            }
            //All Blue Ray Items are present, adding discount for Blueray
            if(blueray.size === 0 && key.indexOf('blu')!==-1){
                let blueDiscount = rayTotal*0.15;
                rayTotal -= blueDiscount;
                discount.push((
                    <div className="discount">
                        Discount (Ray):15%
                        <span><strong>{formatPrice(blueDiscount)}</strong></span>
                    </div>
                ))
            }
            let totalPrice = dvdTotal+rayTotal;
            sum +=count;
            return totalPrice;
            }, 0);
            // Calculating Bulk Item(>100) discount
            if(sum>99){
                let discountTotal = 0.05* total;
                total -= discountTotal;
                discount.push((
                    <div className="discount">
                        Discount (Bulk):5%
                        <span><strong>{formatPrice(discountTotal)}</strong></span>
                    </div>
                ))
            }

        // Making the Order Div to be fixed in view
            let orderView =(
                <div>
                <div style={{paddingBottom:'0'}}></div>
                    <div className='order' style={{border:'1px solid grey'}}>
                    <h1 className="order-title">Order Details</h1>
                    <ul className="order">{orderIds.map(this.renderOrder)}</ul>
                        {discount}
                    <div className="total">
                        Total:
                        <span><strong>{formatPrice(total)}</strong></span>
                    </div>
                </div> 
                </div>
            )
            if(!this.state.isTop) {
                orderView = (
                <div>
                <div style={{paddingBottom:'645px'}}></div>
                    <div style={{position: 'fixed', top: '0px', left: '865px', width: '390px'}}>
                    <div className='order' style={{border:'1px solid grey'}}>
                    <h1 className="order-title">Order Details</h1>
                    <ul className="order">{orderIds.map(this.renderOrder)}</ul>
                        {discount}
                    <div className="total">
                        Total:
                        <span><strong>{formatPrice(total)}</strong></span>
                    </div>
                </div> 
                </div>
                </div>
                )}
        return (
            <div>
                {orderView}
            </div>  
        )

    }
}

export default Order;