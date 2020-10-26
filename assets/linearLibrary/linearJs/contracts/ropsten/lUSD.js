
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/lUSD';
  
      function lUSD(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['lUSD'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.admin = async () => {
        
        return await this.contract.admin();
      };
    
      this.allowance = async (owner, spender) => {
        
        return await this.contract.allowance(owner, spender);
      };
    
      this.approve = async (spender, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.approve(spender, value, txParams);
      };
    
      this.balanceOf = async (account) => {
        
        return await this.contract.balanceOf(account);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async () => {
        
        return await this.contract.candidate();
      };
    
      this.decimals = async () => {
        
        return await this.contract.decimals();
      };
    
      this.integrationProxy = async () => {
        
        return await this.contract.integrationProxy();
      };
    
      this.messageSender = async () => {
        
        return await this.contract.messageSender();
      };
    
      this.name = async () => {
        
        return await this.contract.name();
      };
    
      this.proxy = async () => {
        
        return await this.contract.proxy();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setIntegrationProxy = async (_integrationProxy, txParams) => {
        txParams = txParams || {};
        return await this.contract.setIntegrationProxy(_integrationProxy, txParams);
      };
    
      this.setMessageSender = async (sender, txParams) => {
        txParams = txParams || {};
        return await this.contract.setMessageSender(sender, txParams);
      };
    
      this.setProxy = async (_proxy, txParams) => {
        txParams = txParams || {};
        return await this.contract.setProxy(_proxy, txParams);
      };
    
      this.setTokenStorage = async (_tokenStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.setTokenStorage(_tokenStorage, txParams);
      };
    
      this.symbol = async () => {
        
        return await this.contract.symbol();
      };
    
      this.tokenStorage = async () => {
        
        return await this.contract.tokenStorage();
      };
    
      this.totalSupply = async () => {
        
        return await this.contract.totalSupply();
      };
    
      this.transfer = async (to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transfer(to, value, txParams);
      };
    
      this.transferFrom = async (from, to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transferFrom(from, to, value, txParams);
      };
    
      this.keyName = async () => {
        
        return await this.contract.keyName();
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      this.mint = async (account, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.mint(account, amount, txParams);
      };
    
      this.burn = async (account, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.burn(account, amount, txParams);
      };
    
      }
  
      export default lUSD;
    