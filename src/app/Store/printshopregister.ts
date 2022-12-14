export class PrintShopRegister {
  Shop_Id: Number = 0;
  User_Type: Number = 1;
  User_Id: Number = 0;

  Shop_Name: String = '';

  Shop_Address: String = '';

  Mobile_Number: String = '';
  Contact_Person_Name: String = '';
  Contact_Person_No: String = '';
  Alternative_No: String = '';

  User_Name: String = '';
  Email: String = '';
  Password: String = '';
  Confirm_Password: String = '';

  Bank_Name: String = '';
  Accoount_No: String = '';
  IFSC_Code: String;

  Working_Time_From: String = '';
  Working_Time_To: String = '';

  Role_ID: Number = 0;

  CreatedBy: String = '';
  CreatedDate: String = '';
  modifyBy: String = '';
  modifyDate: String = '';

  public viewName = 'PrintShopRegister';
}
