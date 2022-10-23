import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/User.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.name = faker.name.firstName('male');
  user.lastName = faker.name.lastName('male');
  user.email = faker.internet.email(user.name, user.lastName);
  user.password = faker.internet.password(12);
  user.active = faker.datatype.boolean();
  user.role = faker.datatype.boolean() ? 'admin' : 'chief';

  return user;
});
