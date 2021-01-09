
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
  
        
      this.__LnAdminUpgradeable_init = async (_admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnAdminUpgradeable_init(_admin, txParams);
      };
    
      this.__LnErc20Bridge_init = async (_tokenAddr, _admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnErc20Bridge_init(_tokenAddr, _admin, txParams);
      };
    
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
    
      this.freeze = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.freeze(_amount, txParams);
      };
    
      this.freezeTxLog = async (address_1, string_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.freezeTxLog(address_1, string_1, txParams);
      };
    
      this.getPendingProcess = async (_account, txParams) => {
        txParams = txParams || {};
        return await this.contract.getPendingProcess(_account, txParams);
      };
    
      this.getTotalFrozenToken = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.getTotalFrozenToken(txParams);
      };
    
      this.paused = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.paused(txParams);
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
    
      this.setPaused = async (_paused, txParams) => {
        txParams = txParams || {};
        return await this.contract.setPaused(_paused, txParams);
      };
    
      this.unfreeze = async (_txId, txParams) => {
        txParams = txParams || {};
        return await this.contract.unfreeze(_txId, txParams);
      };
    
      }
  
      export default LnErc20Bridge;
    