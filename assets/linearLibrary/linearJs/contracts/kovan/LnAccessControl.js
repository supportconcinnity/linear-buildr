
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/kovan/LnAccessControl';
  
      function LnAccessControl(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnAccessControl'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.BURN_ASSET_ROLE = async () => {
        
        return await this.contract.BURN_ASSET_ROLE();
      };
    
      this.DEBT_SYSTEM = async () => {
        
        return await this.contract.DEBT_SYSTEM();
      };
    
      this.DEFAULT_ADMIN_ROLE = async () => {
        
        return await this.contract.DEFAULT_ADMIN_ROLE();
      };
    
      this.ISSUE_ASSET_ROLE = async () => {
        
        return await this.contract.ISSUE_ASSET_ROLE();
      };
    
      this.getRoleAdmin = async (role) => {
        
        return await this.contract.getRoleAdmin(role);
      };
    
      this.getRoleMember = async (role, index) => {
        
        return await this.contract.getRoleMember(role, index);
      };
    
      this.getRoleMemberCount = async (role) => {
        
        return await this.contract.getRoleMemberCount(role);
      };
    
      this.grantRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.grantRole(role, account, txParams);
      };
    
      this.hasRole = async (role, account) => {
        
        return await this.contract.hasRole(role, account);
      };
    
      this.renounceRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.renounceRole(role, account, txParams);
      };
    
      this.revokeRole = async (role, account, txParams) => {
        txParams = txParams || {};
        return await this.contract.revokeRole(role, account, txParams);
      };
    
      this.IsAdmin = async (_address) => {
        
        return await this.contract.IsAdmin(_address);
      };
    
      this.SetAdmin = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetAdmin(_address, txParams);
      };
    
      this.SetRoles = async (roleType, addresses, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetRoles(roleType, addresses, setTo, txParams);
      };
    
      this.SetIssueAssetRole = async (issuer, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetIssueAssetRole(issuer, setTo, txParams);
      };
    
      this.SetBurnAssetRole = async (burner, setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetBurnAssetRole(burner, setTo, txParams);
      };
    
      this.SetDebtSystemRole = async (_address, _setTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetDebtSystemRole(_address, _setTo, txParams);
      };
    
      }
  
      export default LnAccessControl;
    