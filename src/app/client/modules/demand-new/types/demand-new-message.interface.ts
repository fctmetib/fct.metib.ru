export interface DemandMessageInterface {
  DemandMessageID: number,
  DemandMessageTypeID: number,
  Date: Date,
  User: {
    UserID: number,
    Name: {
      First: string
      Last: string
    },
    Phone: string,
    Email: string,
    Login: string,
    AvatarCode: string,
    AvatarImage: string,
    IsMale: boolean
  },
  Comment: string
}

// export interface DemandMessageInterface {
//   Type: string;
//   Date: Date;
//   User: string;
//   Comment: string;
//   FileCode: string;
//   ID: number;
//   DemandMessageID?: number;
//   DemandMessageTypeID?: number;
//   UserID?: number;
// }
