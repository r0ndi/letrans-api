import { getRepository, Repository } from "typeorm";
import UserEntity from "../entities/user.entity";
import UserAlreadyExistsException from "../exceptions/user-already-exists.exception";
import RegisterDto from "../validations/register.dto";
import TokenData from "../interfaces/token-data.interface";
import TokenStoredData from "../interfaces/token-data-stored.interface";
import WrongCredentialsException from "../exceptions/wrong-credentials.exception";
import AuthorizationDataType from "../types/authorization-data.type";
import LogInDto from "../validations/log-in.dto";
import appConfig from "../configs/app.config";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import ObjectUndefinedType from "../types/object-undefined.type";

class AuthenticationService {
    private userRepository: Repository<UserEntity> = getRepository(UserEntity);
    private readonly EXPIRES_IN = 60 * 60;

    public register = async (registerData: RegisterDto): Promise<AuthorizationDataType> => {
        if (await this.userRepository.findOne({ email: registerData.email })) {
            throw new UserAlreadyExistsException(registerData.email);
        }

        const hashedPassword: string = await bcryptjs.hash(registerData.password, appConfig.PASSWORD_SALT);
        const user: UserEntity = this.userRepository.create({...registerData, password: hashedPassword});

        await this.userRepository.save(user);

        const tokenData: TokenData = this.createToken(user);
        const cookie: string = this.createCookie(tokenData);
        return { tokenData, cookie, user };
    }

    public logIn = async (logInData: LogInDto): Promise<AuthorizationDataType> => {
        const user: ObjectUndefinedType<UserEntity> = await this.userRepository.findOne({ email: logInData.email });
        if (user === undefined) {
            throw new WrongCredentialsException();
        }

        const isMatchedPassword = await bcryptjs.compare(logInData.password, user.password ?? "");
        if (!isMatchedPassword) {
            throw new WrongCredentialsException();
        }

        const tokenData: TokenData = this.createToken(user);
        const cookie: string = this.createCookie(tokenData);
        return { tokenData, cookie, user };
    }

    public refreshToken = (user: UserEntity): AuthorizationDataType => {
        const tokenData: TokenData = this.createToken(user);
        const cookie: string = this.createCookie(tokenData);
        return { tokenData, cookie, user };
    }

    private createToken = (user: UserEntity): TokenData => {
        const expiresIn: number = this.EXPIRES_IN;
        const secret: string = appConfig.JWT_SECRET;
        const tokenDataStored: TokenStoredData = {
            id: user.id,
        };

        return {
            expiresIn,
            token: jwt.sign(tokenDataStored, secret, { expiresIn }),
        };
    }

    private createCookie = (tokenData: TokenData): string => {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}

export default AuthenticationService;
