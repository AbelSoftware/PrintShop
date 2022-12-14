export class PrintShopRegister {
  Shop_Id: Number = 0;
  User_Type: Number = 1;

  Shop_Name: String = '';

  Shop_Address: String = '';

  Mobile_Number: string = '';
  Contact_Person_Name: String = '';
  Contact_Person_No: string = '';
  Alternative_No: string = '';

  User_Name: string = '';
  Email: String = '';
  Password: String = '';
  Confirm_Password: string = '';

  Bank_Name: String = '';
  Accoount_No: String = '';
  IFSC_Code: String;

  Working_Time_From: string = '';
  Working_Time_To: string = '';

  Role_ID: Number = 0;

  CreatedBy: String = '';
  CreatedDate: String = '';
  modifyBy: String = '';
  modifyDate: String = '';

  public viewName = 'PrintShopRegister';
}
