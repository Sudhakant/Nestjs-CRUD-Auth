import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FeedPostEnity } from 'src/feed/models/post.entity';
import { Role } from './role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => FeedPostEnity, (feedPostEntity) => feedPostEntity.author)
  feedPosts: FeedPostEnity[];
}
