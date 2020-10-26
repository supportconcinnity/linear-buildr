
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnConfig';
  
      function LnConfig(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnConfig'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.BUILD_RATIO = async () => {
        
        return await this.contract.BUILD_RATIO();
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
    
      this.getUint = async (key) => {
        
        return await this.contract.getUint(key);
      };
    
      this.setUint = async (key, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.setUint(key, value, txParams);
      };
    
      this.deleteUint = async (key, txParams) => {
        txParams = txParams || {};
        return await this.contract.deleteUint(key, txParams);
      };
    
      this.batchSet = async (names, values, txParams) => {
        txParams = txParams || {};
        return await this.contract.batchSet(names, values, txParams);
      };
    
      }
  
      export default LnConfig;
    