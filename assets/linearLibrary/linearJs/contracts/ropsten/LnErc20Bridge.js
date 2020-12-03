
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnErc20Bridge';
  
      function LnErc20Bridge(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnErc20Bridge'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.admin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.admin(txParams);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.candidate(txParams);
      };
    
      this.frozenOf = async (address_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.frozenOf(address_1, txParams);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.totalFrozen = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.totalFrozen(txParams);
      };
    
      this.freeze = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.freeze(_amount, txParams);
      };
    
      this.unfreeze = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.unfreeze(_amount, txParams);
      };
    
      }
  
      export default LnErc20Bridge;
    