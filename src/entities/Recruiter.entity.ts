import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Recruiter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  company!: string;
}
