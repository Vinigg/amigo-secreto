import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateDrawsTable1734791718642 implements MigrationInterface {
  /**
     * 
     * 5. Tabela: Draws (Sorteios)
        Registra os pares sorteados.

        Campo	Tipo	Descrição
        id	INT (PK)	Identificador único do sorteio.
        group_id	INT (FK)	ID do grupo (relacionado a Groups).
        giver_id	INT (FK)	ID do usuário que dará o presente (relacionado a Users).
        receiver_id	INT (FK)	ID do usuário que receberá o presente (relacionado a Users).
        created_at	TIMESTAMP	Data do sorteio.
     */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "draws",
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
            name: "giver_id",
            type: "uuid"
          },
          {
            name: "receiver_id",
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
    await queryRunner.createForeignKeys("draws", [
      new TableForeignKey({ columnNames: ["group_id"], referencedColumnNames: ["id"], referencedTableName: "groups" }),
      new TableForeignKey({ columnNames: ["giver_id"], referencedColumnNames: ["id"], referencedTableName: "users" }),
      new TableForeignKey({ columnNames: ["receiver_id"], referencedColumnNames: ["id"], referencedTableName: "users" })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("draws")
  }
}
