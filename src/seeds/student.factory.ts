import { setSeederFactory } from 'typeorm-extension';
import { Student } from '../developer/entity';
import { v4 as uuidV4 } from 'uuid';


export default setSeederFactory(Student, (faker) => {
  const student = new Student();
  student.name = faker.name.firstName();
  student.lastName = faker.name.lastName();
  student.image = {
    url: faker.internet.avatar(),
    id: uuidV4()
  };
  student.age = faker.datatype.number({ min: 20, max: 50 });
  student.city = faker.address.cityName();
  student.country = faker.address.country();
  student.email = faker.internet.email(student.name, student.lastName);
  student.active = faker.datatype.boolean();
  student.skills = faker.helpers.arrayElements(
    [
      'javascript', 'css', 'docker', 'ci/cd', 'typescript', 'express',
      'tailwind', 'react', 'material-ui', 'styled-components', 'sass',
      'backend', 'nestjs', 'nextjs', 'node', 'responsive web design',
      'ux/ui', 'postgres', 'mongo', 'redis', 'mysql', 'sequelize', 'typeorm'
    ]
  );
  student.profession = faker.helpers.arrayElement(
    ['software engineer', 'programmer', 'software developer', 'fullstack developer']
  );
  student.description = faker.lorem.sentence();
  student.github = `https://github.com/${faker.internet.userName(student.name, student.lastName)}/`;
  student.linkedin = `https://www.linkedin.com/in/${faker.internet.userName(student.name, student.lastName)}/`;
  student.portfolio = faker.internet.url();

  return student;
});
