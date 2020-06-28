import React, {Component} from 'react'
//import logo from './logo.svg';
import './App.css';
import getWeb3 from './utils/getWeb3';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

const contract = require('truffle-contract')
const simpleStorage = contract(SimpleStorageContract)
let account;
let sha3;
// Declaring this for later so we can chain functions on SimpleStorage.
let contractInstance;
class App extends Component{
  constructor(props) {
    super(props)

    this.state = {
      blockChainHash: null,
      web3: null,
      address: null,
      imgHash: null,
      isWriteSuccess: false,
      isipfs:false,
      isauth:null,
      sha3:null
    }
  }
  componentWillMount() {

    getWeb3.then(results => {
      this.setState({web3: results.web3})
      console.log('web3:',this.state.web3)
      // Instantiate contract once web3 provided.
      this.instantiateContract()
      
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }
  instantiateContract = () => {

    simpleStorage.setProvider(this.state.web3.currentProvider);
    this.state.web3.eth.getAccounts((error, accounts) => {
      
      account =accounts[0];
      
      console.log('account:',account);
      simpleStorage.at('0x13aECCd2FFAd9824d63329dE9c019df4e3a8F3ab').then((contract) => {
        console.log('合约地址：',contract.address);
        contractInstance = contract;
        this.setState({address: contractInstance.address});
        return;
      });
    })

  }

  render(){
    return(<div>
      获取账户的所有交易hash：
      <button onClick={()=>{
          this.state.web3.eth.getPastLogs({address: "0x7ECAba2451053B7b5C11d1c23c2cfAf44b08711f"
            }
            ).then((a)=>console.log(a)).catch(e=>console.log(e))
        }}>提交</button>
      通過交易hash获取所有信息：
      <button onClick={()=>{
          this.state.web3.eth.getTransaction('0x2de046cb9a98c2b4ad9c777ab5d61f6a44ae089ee69b5a831e3bb2262adabc32').then(console.log)
        }}>提交</button>
      获取sha3：
      <button onClick={()=>{
          sha3=this.state.web3.utils.sha3("Transfer(address,address,uint256)")
          this.setState({sha3:sha3})
          console.log(sha3)
        }}>提交</button>
    </div>)
  }
}

export default App;
