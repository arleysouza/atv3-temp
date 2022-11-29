import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import User from "./User";

@Entity({ name: "departments" })
export default class Department {
    @PrimaryGeneratedColumn()
    iddepartment: number;

    @Column({ length: 70, nullable: false, unique:true })
    name: string;
}