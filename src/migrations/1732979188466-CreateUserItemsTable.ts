import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUserItemsTable1732979188466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "item_id",
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
    await queryRunner.createForeignKeys("user_items", [
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users"
      }),
      new TableForeignKey({
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items"
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_items")
  }
}
