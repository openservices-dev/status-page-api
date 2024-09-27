import Issues from './Issues';
import repositories from '../../repositories';

const container = {
  get Issues() {
    return new Issues(repositories.Issue);
  },
};

export default container;
