import ArrayRepository from './ArrayRepository';
import repositories from '../';

const container = {
  get Array(): IssueRepository {
    if (typeof this._array === 'undefined') {
      this._array = new ArrayRepository(repositories.Project);
    }
    return this._array;
  },
};

export default container;
