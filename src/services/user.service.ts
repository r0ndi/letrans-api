import UserEntity from "../entities/user.entity";
import { getRepository } from "typeorm";
import UserNotFoundException from "../exceptions/user-not-found.exception";
import InvalidUserException from "../exceptions/invalid-user.exception";
import ObjectUndefinedType from "../types/object-undefined.type";

class UserService {
    private userRepository = getRepository(UserEntity);

    // TODO: add roles for users and allow administrators to getting other users
    public getMatchedUser = async (contextUser: ObjectUndefinedType<UserEntity>, userId: string): Promise<UserEntity> => {
        if (!contextUser || contextUser.id !== userId) {
            throw new InvalidUserException();
        }

        try {
            return await this.userRepository.findOneOrFail(userId);
        } catch (error) {
            throw new UserNotFoundException();
        }
    }
}

export default UserService;
