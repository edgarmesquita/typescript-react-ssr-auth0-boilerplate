import axios from 'axios';
import { IUser } from 'common/models/user';

export interface IUserProfile {
    nickname: string;
    name?: string;
    picture?: string;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    sub: string;
}
export class UserClient {
    public async getProfile () : Promise<IUserProfile> {
        const response = await axios.get<IUserProfile>('/profile');
        return response.data;
    }
}