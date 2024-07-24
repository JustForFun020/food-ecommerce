import _ from 'lodash';
import { User } from './types/user';

export const getUserData = (data: any): User => {
  return _.get(data, 'getUserByUsername', {}) as User;
};
