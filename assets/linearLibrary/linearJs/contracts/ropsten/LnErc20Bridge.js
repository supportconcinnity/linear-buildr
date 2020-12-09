
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
    
      this.freezeTxLog = async (address_1, string_1) => {
        
        return await this.contract.freezeTxLog(address_1, string_1);
      };
    
      this.pendingProcess = async (address_1, uint256_1) => {
        
        return await this.contract.pendingProcess(address_1, uint256_1);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setFreezeTx = async (_account, _txId, _amount, _timestamp, txParams) => {
        txParams = txParams || {};
        return await this.contract.setFreezeTx(_account, _txId, _amount, _timestamp, txParams);
      };
    
      this.freeze = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.freeze(_amount, txParams);
      };
    
      this.unfreeze = async (_txId, txParams) => {
        txParams = txParams || {};
        return await this.contract.unfreeze(_txId, txParams);
      };
    
      this.getTotalFrozenToken = async () => {
        
        return await this.contract.getTotalFrozenToken();
      };
    
      this.getPendingProcess = async (_account) => {
        
        return await this.contract.getPendingProcess(_account);
      };
    
      }
  
      export default LnErc20Bridge;
    