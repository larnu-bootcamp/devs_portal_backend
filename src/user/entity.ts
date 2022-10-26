import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity()
export class User {
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

  @Column({ default: 'admin' })
  role!: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  setPassword = (password: string) => {
    return (this.password =  bcrypt.hashSync(password, 8));
  };

  generateJWT = () => {
    return jwt.sign(
      {
        email: this.email,
      },
      'SECRET',
      {
        expiresIn: '1h'
      }
    );
  };

}