import config from './config';
import logger from './logger';
import repositories from './repositories';
import Healthcheck from './services/Healthcheck';

const healthecks = config.projects.map(project => {
  const healthcheck = new Healthcheck(
    project.healthcheck.type,
    project.healthcheck.url,
    async (result: { checkedAt: string, status: string }) => {
      const p = await repositories.Project.get(project.id);

      if ('history' in p === false) p['history'] = { healthchecks: [] };

      p.history.healthchecks.unshift(result);
      if (p.history.healthchecks.length > 5) p.history.healthchecks.pop();

      await repositories.Project.update({ history: p.history }, { id: project.id });
    });

  healthcheck.start(project.healthcheck.interval);

  return healthcheck;
});

process.on('SIGTERM', () => {
  logger.info('Stopping healthchecks...');
  
  healthecks.forEach(healthcheck => healthcheck.stop());
});
