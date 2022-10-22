import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column()
  age!: number;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  active!: boolean;

  @Column('varchar', { array: true, default: [] })
  skills!: string[];

  @Column()
  profession!: string;

  @Column('text')
  description!: string;

  @Column()
  github!: string;

  @Column()
  linkedin!: string;

  @Column()
  portfolio!: string;
}
