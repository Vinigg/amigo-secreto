import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateGroupMembersTable1734788803214 implements MigrationInterface {
  /**
 
  * Tabela: GroupMembers (Membros do Grupo)
    Relaciona os usuários com os grupos.

    Campo	Tipo	Descrição
    id	INT (PK)	Identificador único do registro.
    group_id	INT (FK)	ID do grupo (relacionado a Groups).
    user_id	INT (FK)	ID do usuário (relacionado a Users).
    created_at	TIMESTAMP	Data de adição ao grupo.
*/

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "group_members",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "group_id",
            type: "uuid"
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true
          }
        ]
      })
    )
    await queryRunner.createForeignKeys("group_members", [
      new TableForeignKey({ columnNames: ["group_id"], referencedColumnNames: ["id"], referencedTableName: "groups" }),
      new TableForeignKey({ columnNames: ["user_id"], referencedColumnNames: ["id"], referencedTableName: "users" })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("group_members")
  }
}
