export interface IUser {
  id: number;
  name: string;
  userName: string;
  lastName: string;
  email: string;
  phone: string;
  ext: string;
  company: string;
  state: string;
  image: string;
  visible: string;
  imageBase64: string;
  career: string;
}

export class UserModel {
  guid?: string;
  name!: string;
  lastName!: string;
  username!: string;
  password!: string;
  salt!: string;
  email!: string;
  phone!: string;
  visible: boolean = true;
  image?: string | null;
  stateGuid?: string | null;
  stateName!: string;
  headquartersGuid?: string | null;
  headquartersName!: string;
  positionGuid?: string | null;
  positionName!: string;
  imageBase64!: string;
  ext!: string;
  isPrincipal?: boolean | null;
  userTypeGuid?: string | null;
  userTypeDescriptionManagement!: string;
}
