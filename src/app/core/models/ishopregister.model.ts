export interface ShopRegister{     

    Shop_Id : Number;
    User_Name: string;
    Shop_Name : String;

    Shop_Address : String;

    MobileNumber : string;
    Contact_Person_Name : String;
    Contact_Person_No : string;
    Alternative_No : string;

    Email : String;    
    Password : String;
    Confirm_Password: string;

    Bank_Name : String;
    Accoount_No : String;
    IFSC_Code : String;

    Working_Time_From: string;
    Working_Time_To: string;

    Role_ID : Number; 
    
    CreatedBy : String;   
    CreatedDate : String;
    modifyBy : String;
    modifyDate : String; 

}

export interface IUserResponce{    
    message:String; 
    status :Number;
    data : ShopRegister[];
}

export interface UserRole{     
   
    RoleID:Number; 
    RoleName:string; 
}

export interface IUserRoleResponce{    
    Msg:String; 
    ServiceResponse :number;
    Data : UserRole[];
}