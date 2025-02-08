import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddDrawDayColumnOnGroupsTable1738972825460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "groups",
      new TableColumn({
        name: "draw_day",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("groups", "draw_day")
  }
}
