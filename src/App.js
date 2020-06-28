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
      imgHash: "2222",
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
      simpleStorage.at('0xb5560A42F3F4d7b8321d62789C51915c4426f598').then((contract) => {
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
          this.state.web3.eth.getPastLogs({address: "0xF35CE50D9cFe4434B890e5Ef82fE2f6e1b11f0bE"
            }
            ).then((a)=>console.log(a)).catch(e=>console.log(e))
        }}>提交</button>
      通過交易hash获取所有信息：
      <button onClick={()=>{
          this.state.web3.eth.getTransaction('0x62281ec1012a45922067466919a580045e407565b138c45e155b386575e03667').then(console.log)
        }}>提交</button>
      {/* 获取sha3：
      <button onClick={()=>{
          sha3=this.state.web3.utils.sha3("Transfer(address,address,uint256)")
          this.setState({sha3:sha3})
          console.log(sha3)
        }}>提交</button> */}
        存入区块链中：
        <button onClick={() => {
                    //this.state.web3.eth.personal.unlockAccount(account, "333518", 600)
                    contractInstance.set(this.state.imgHash, {from:account}).then(() => {
                    console.log('account:',account);
                    console.log('文件的hash已经写入到区块链！');
                  })
                }}>提交</button>
         取出区块链中：
        <button onClick={() => {
                    //this.state.web3.eth.personal.unlockAccount(account, "333518", 600)
                    contractInstance.get({from:account}).then((data) => {
                    console.log('data:',data);
                  })
                }}>提交</button>       
        getTransactionReceipt:
        <button onClick={()=>{
            this.state.web3.eth.getTransactionReceipt('0x62281ec1012a45922067466919a580045e407565b138c45e155b386575e03667')
          .then(console.log);
        }}>提交</button>
         getTransaction:
        <button onClick={()=>{
            this.state.web3.eth.getTransaction('0x62281ec1012a45922067466919a580045e407565b138c45e155b386575e03667')
          .then(console.log);
        }}>提交</button>
    </div>)
  }
}

export default App;
