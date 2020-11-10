
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/bsctestnet/LnDebtSystem';
  
      function LnDebtSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnDebtSystem'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.MAX_DEL_PER_TIME = async () => {
        
        return await this.contract.MAX_DEL_PER_TIME();
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
    
      this.debtCurrentIndex = async () => {
        
        return await this.contract.debtCurrentIndex();
      };
    
      this.feeSystem = async () => {
        
        return await this.contract.feeSystem();
      };
    
      this.lastCloseAt = async () => {
        
        return await this.contract.lastCloseAt();
      };
    
      this.lastDebtFactors = async (uint256_1) => {
        
        return await this.contract.lastDebtFactors(uint256_1);
      };
    
      this.lastDeletTo = async () => {
        
        return await this.contract.lastDeletTo();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.userDebtState = async (address_1) => {
        
        return await this.contract.userDebtState(address_1);
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      this.SetLastCloseFeePeriodAt = async (index, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetLastCloseFeePeriodAt(index, txParams);
      };
    
      this.PushDebtFactor = async (_factor, txParams) => {
        txParams = txParams || {};
        return await this.contract.PushDebtFactor(_factor, txParams);
      };
    
      this.UpdateUserDebt = async (_user, _debtProportion, txParams) => {
        txParams = txParams || {};
        return await this.contract.UpdateUserDebt(_user, _debtProportion, txParams);
      };
    
      this.UpdateDebt = async (_user, _debtProportion, _factor, txParams) => {
        txParams = txParams || {};
        return await this.contract.UpdateDebt(_user, _debtProportion, _factor, txParams);
      };
    
      this.GetUserDebtData = async (_user) => {
        
        return await this.contract.GetUserDebtData(_user);
      };
    
      this.LastSystemDebtFactor = async () => {
        
        return await this.contract.LastSystemDebtFactor();
      };
    
      this.GetUserCurrentDebtProportion = async (_user) => {
        
        return await this.contract.GetUserCurrentDebtProportion(_user);
      };
    
      this.GetUserDebtBalanceInUsd = async (_user) => {
        
        return await this.contract.GetUserDebtBalanceInUsd(_user);
      };
    
      }
  
      export default LnDebtSystem;
    