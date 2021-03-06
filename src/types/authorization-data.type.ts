import UserEntity from "../entities/user.entity";
import TokenData from "../interfaces/token-data.interface";

type AuthorizationDataType = {
    tokenData: TokenData;
    user: UserEntity;
    cookie: string;
};

export default AuthorizationDataType;
