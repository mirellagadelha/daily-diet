/*
  Warnings:

  - You are about to drop the column `date` on the `meals` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_diet_meal" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("description", "id", "is_diet_meal", "name") SELECT "description", "id", "is_diet_meal", "name" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
