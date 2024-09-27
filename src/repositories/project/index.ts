import ArrayRepository from './ArrayRepository';
import config from '../../config';

const container = {
  get Array(): ProjectRepository {
    if (typeof this._array === 'undefined') {
      this._array = new ArrayRepository('projects' in config ? config.projects : []);
    }
    return this._array;
  },
};

export default container;
