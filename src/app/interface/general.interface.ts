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



