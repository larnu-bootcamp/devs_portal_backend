import { setSeederFactory } from 'typeorm-extension';
import { User } from '../user/entity';


export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email(user.name, user.lastName);
  user.password = faker.internet.password(12);
  user.active = faker.datatype.boolean();

  return user;
});
