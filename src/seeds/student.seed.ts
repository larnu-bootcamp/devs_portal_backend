import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Student } from '../developer/entity';


export default class StudentSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) {

    const studentFactory = factoryManager.get(Student);
    // save (n) factory generated entities, to the database
    await studentFactory.saveMany(50);
  }
}
