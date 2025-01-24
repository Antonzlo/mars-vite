import Airbrake from 'airbrake-js';

const airbrake = new Airbrake({
  projectId: 'YOUR_PROJECT_ID',
  projectKey: 'YOUR_PROJECT_KEY',
  environment: 'production', // или 'development' в зависимости от окружения
});

export default airbrake;