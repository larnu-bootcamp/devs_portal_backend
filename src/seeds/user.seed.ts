import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../user/entity';


export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {

    const userFactory = factoryManager.get(User);
    // save (n) factory generated entities, to the database
    await userFactory.saveMany(2);
  }
}
