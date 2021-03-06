export interface HttpDataInterface {
  data: any;
  status: boolean;
  message: any;
}


export interface LoadData {
  data: string;
  status: boolean;
  message?: string;
  success?: boolean;
}

export interface UpdateData {
  update: string;
  set: any;
  where: {id?: any;}
}

export interface UserInformation {
    info: {first_name: string, last_name: string},
    menu?: any[]
}

