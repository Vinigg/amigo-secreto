import { MigrationInterface, QueryRunner, Table } from "typeorm"

/**
 * 
 * 2. Tabela: Groups (Grupos de Sorteio)
    Armazena os grupos de sorteio.

    Campo	Tipo	Descrição
    id	INT (PK)	Identificador único do grupo.
    name	VARCHAR(100)	Nome do grupo de sorteio.
    description	TEXT	Descrição do grupo (opcional).
    created_at	TIMESTAMP	Data de criação do grupo.
    updated_at	TIMESTAMP	Última atualização do grupo.
 */
export class CreateGroupsTable1734788161361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "groups",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "name",
            type: "varchar",
            length: "100"
          },
          {
            name: "description",
            type: "text",
            isNullable: true
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups")
  }
}
