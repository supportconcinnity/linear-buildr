
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/mainnet/LnTokenCliffLocker';
  
      function LnTokenCliffLocker(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnTokenCliffLocker'],
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
    
      this.lockData = async (address_1) => {
        
        return await this.contract.lockData(address_1);
      };
    
      this.paused = async () => {
        
        return await this.contract.paused();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.sendLockTokenMany = async (_users, _amounts, _locktimes, txParams) => {
        txParams = txParams || {};
        return await this.contract.sendLockTokenMany(_users, _amounts, _locktimes, txParams);
      };
    
      this.avaible = async (_user) => {
        
        return await this.contract.avaible(_user);
      };
    
      this.sendLockToken = async (_user, _amount, _locktimes, txParams) => {
        txParams = txParams || {};
        return await this.contract.sendLockToken(_user, _amount, _locktimes, txParams);
      };
    
      this.claimToken = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.claimToken(_amount, txParams);
      };
    
      }
  
      export default LnTokenCliffLocker;
    