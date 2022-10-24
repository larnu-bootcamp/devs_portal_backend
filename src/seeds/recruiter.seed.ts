import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Recruiter } from '../recruiter/entity';


export default class RecruiterSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {

    const recruiterFactory = factoryManager.get(Recruiter);
    // save (n) factory generated entities, to the database
    await recruiterFactory.saveMany(20);
  }
}
