
# How to use TypeORM



## Migrations

* Information based on official documentation [here](https://typeorm.io/#/migrations)

As we remember TypeORM has two ways to synchronize the database. 

1. One way can be synchronized directly from Entities class. This way TypeORM will update the tables definitions every time you start the project.
2. Another way can be through migrations. When you use migrations, you leave the responsibility to synchronize the entities with the tables definitions to typeorm client or another database register like [liquibase](https://www.liquibase.org/) or [flyway](https://flywaydb.org/) 

### Commands

1. Create a migration

    After you update the entities and models you must create a new file 
