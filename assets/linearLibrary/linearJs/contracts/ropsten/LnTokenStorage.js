
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnTokenStorage';
  
      function LnTokenStorage(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnTokenStorage'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.admin = async () => {
        
        return await this.contract.admin();
      };
    
      this.allowance = async (address_1, address_2) => {
        
        return await this.contract.allowance(address_1, address_2);
      };
    
      this.balanceOf = async (address_1) => {
        
        return await this.contract.balanceOf(address_1);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async () => {
        
        return await this.contract.candidate();
      };
    
      this.operator = async () => {
        
        return await this.contract.operator();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setOperator = async (_opperator, txParams) => {
        txParams = txParams || {};
        return await this.contract.setOperator(_opperator, txParams);
      };
    
      this.setAllowance = async (tokenOwner, spender, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.setAllowance(tokenOwner, spender, value, txParams);
      };
    
      this.setBalanceOf = async (account, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.setBalanceOf(account, value, txParams);
      };
    
      }
  
      export default LnTokenStorage;
    