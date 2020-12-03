
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/bsctestnet/lETH';
  
      function lETH(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['lETH'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.Log0 = async (callData, txParams) => {
        txParams = txParams || {};
        return await this.contract.Log0(callData, txParams);
      };
    
      this.Log1 = async (callData, topic1, txParams) => {
        txParams = txParams || {};
        return await this.contract.Log1(callData, topic1, txParams);
      };
    
      this.Log2 = async (callData, topic1, topic2, txParams) => {
        txParams = txParams || {};
        return await this.contract.Log2(callData, topic1, topic2, txParams);
      };
    
      this.Log3 = async (callData, topic1, topic2, topic3, txParams) => {
        txParams = txParams || {};
        return await this.contract.Log3(callData, topic1, topic2, topic3, txParams);
      };
    
      this.Log4 = async (callData, topic1, topic2, topic3, topic4, txParams) => {
        txParams = txParams || {};
        return await this.contract.Log4(callData, topic1, topic2, topic3, topic4, txParams);
      };
    
      this.admin = async () => {
        
        return await this.contract.admin();
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async () => {
        
        return await this.contract.candidate();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setTarget = async (_target, txParams) => {
        txParams = txParams || {};
        return await this.contract.setTarget(_target, txParams);
      };
    
      this.target = async () => {
        
        return await this.contract.target();
      };
    
      this.name = async () => {
        
        return await this.contract.name();
      };
    
      this.getOwner = async () => {
        
        return await this.contract.getOwner();
      };
    
      this.symbol = async () => {
        
        return await this.contract.symbol();
      };
    
      this.decimals = async () => {
        
        return await this.contract.decimals();
      };
    
      this.totalSupply = async () => {
        
        return await this.contract.totalSupply();
      };
    
      this.balanceOf = async (account) => {
        
        return await this.contract.balanceOf(account);
      };
    
      this.allowance = async (owner, spender) => {
        
        return await this.contract.allowance(owner, spender);
      };
    
      this.transfer = async (to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transfer(to, value, txParams);
      };
    
      this.approve = async (spender, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.approve(spender, value, txParams);
      };
    
      this.transferFrom = async (from, to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transferFrom(from, to, value, txParams);
      };
    
      }
  
      export default lETH;
    