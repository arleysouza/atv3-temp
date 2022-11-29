import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import * as bcrypt from "bcrypt";
import Department from "./Department";

export type Profile = "employee" | "manager" | "admin";

@Entity({ name: "users" })
export default class User {
    @PrimaryGeneratedColumn()
    iduser: number;

    @Column({ length: 70, nullable: false })
    name: string;

    @Column({ length: 70,nullable: false, unique: true })
    mail: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Column({ type: 'enum', enum: ["employee", "manager", "admin"], default: 'employee', nullable: false })
    profile: Profile;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        }
    }

    compare(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}