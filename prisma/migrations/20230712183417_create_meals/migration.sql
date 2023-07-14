-- CreateTable
CREATE TABLE "meals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_diet_meal" BOOLEAN NOT NULL DEFAULT true
);
