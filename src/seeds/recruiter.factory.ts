import { setSeederFactory } from 'typeorm-extension';
import { Recruiter } from '../recruiter/entity';


export default setSeederFactory(Recruiter, (faker) => {
  const recruiter = new Recruiter();
  recruiter.name = faker.name.firstName();
  recruiter.lastName = faker.name.lastName();
  recruiter.email = faker.internet.email(recruiter.name, recruiter.lastName);
  recruiter.company = faker.company.name();

  return recruiter;
});
