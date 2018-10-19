import React from 'react';
import Header from './header';
import Order from './order';
import product from '../star-wars-data';
import StarWar from './starwar';
import Navbar from './navbar';
import Footer from './footer';

class App extends React.Component {
    state = {
        starwars: {},
        order: {}
      };
    // Loading the Products from file "star-wars-data.js"
      componentDidMount(){
        this.setState({ starwars: product});
      };
    // Update the Quantity to Order Cart
      addToOrder = (key,quantity) => {
        console.log(quantity)
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. Either add to the order, or update the number in our order
        if(quantity>0){
            order[key] = order[key] + quantity || quantity;
        }
        // 3. Call setState to update our state object
        this.setState({ order });
      };
      // Remove entire item from the Order Cart
      removeFromOrder = key => {
        // 1. take a copy of state
        const order = { ...this.state.order };
        // 2. remove that item from order
        delete order[key];
        // 3. Call setState to update our state order
        this.setState({ order });
      };

      // Change Order in the cart
      changeOrder = (key) =>{
         //1. take a copy of state
         const order = {...this.state.order};
         //2. update the item in the cart
         const value = document.querySelector(`.order${key}`).value;
         order[key] = parseInt(value);
         //3. Call setState to update our state order
         this.setState({order});
      }
    
    render(){
        return(
            <div className="container-fluid">
            <Navbar/>
            <div className="col-sm-8" style={{marginTop:'50px',border:'1px solid grey'}}>
            <Header />
            <ul className="prod-layout">
            {Object.keys(this.state.starwars).map(key => (
              <StarWar
                key={key}
                index={key}
                details={this.state.starwars[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
          </div>
            <div className="col-sm-4" style={{marginTop:'50px'}}>
            <Order starwars={this.state.starwars} 
                   order={this.state.order} 
                   removeFromOrder={this.removeFromOrder} 
                   changeOrder={this.changeOrder}/>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default App;