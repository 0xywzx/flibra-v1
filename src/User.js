import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import libraFreeMarketIcon from './images/Libra-Freemarket-icon.png'

class User extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        loading: false,
      };
    this.handleTransfer = this.handleTransfer.bind(this);
  }
  
  handleTransfer = async() => {
    this.setState({ loading: true })
    await this.props.transfer(this.state.address, this.state.amount)
    this.setState({ loading: false })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="icon-header">
              <img className="libraFreeMarketIcon" src={libraFreeMarketIcon} alt="libraFreeMarketIcon" />
            </div>
            <div className="create-user">
              <p className="small">ログインしたあと、一回ページをリロードすると表示されます</p>
              <p>Libra アドレス：{this.props.userAddress} </p>
              <p>残高：{this.props.balance} </p>
              <br/>
              <p>Ether アドレス：{this.props.etherAddress}</p>
              <br/>
              <h3>商品リスト</h3>
              { this.props.myItems.map((item, key) => {
                return (
                  <div className="card border-info text-black" key={key} >
                  <div className="card-header">
                  </div>
                  <div className="card-body">
                    <div className="card-text">
                      <p>{item.itemName}</p>
                      <p>価格：{item.price}</p>
                    </div>
                  </div>
                  <div className="card-footer"><small className="text-muted"> </small></div>
                </div>
                )
              })}
            </div>    
          </div>
        </div>
      </div>
    );
  }
}

export default User;
