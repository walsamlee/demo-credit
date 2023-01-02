import { Knex } from "knex";
import { userData } from "../common/data";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert(userData);
};
