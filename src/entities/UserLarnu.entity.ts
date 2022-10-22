import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity({ name: 'user_larnu' })
export class UserLarnu {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ name: 'last_name' })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  active!: boolean;

  @Column()
  rol!: string;
}
