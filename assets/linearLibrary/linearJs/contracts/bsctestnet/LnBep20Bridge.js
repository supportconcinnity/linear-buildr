
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/bsctestnet/LnBep20Bridge';
  
      function LnBep20Bridge(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnBep20Bridge'],
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
    
      this.freezeTxLog = async (address_1, string_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.freezeTxLog(address_1, string_1, txParams);
      };
    
      this.pendingProcess = async (address_1, uint256_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.pendingProcess(address_1, uint256_1, txParams);
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
    
      this.getTotalFrozenToken = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.getTotalFrozenToken(txParams);
      };
    
      this.getPendingProcess = async (_account, txParams) => {
        txParams = txParams || {};
        return await this.contract.getPendingProcess(_account, txParams);
      };
    
      }
  
      export default LnBep20Bridge;
    