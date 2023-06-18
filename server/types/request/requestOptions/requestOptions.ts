import { UserModel } from '../../models/models.type'

export enum sortOptions {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
}


export const sortFunctions = {
  [sortOptions.NEWEST]: (a: UserModel, b: UserModel) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  [sortOptions.OLDEST]: (a: UserModel, b: UserModel) => a.updatedAt.getTime() - b.updatedAt.getTime(),
};
