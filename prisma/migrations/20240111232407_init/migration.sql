/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Tags` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compliments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_sender" TEXT NOT NULL,
    "user_destiny" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Compliments_user_sender_fkey" FOREIGN KEY ("user_sender") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compliments_user_destiny_fkey" FOREIGN KEY ("user_destiny") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compliments_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compliments" ("createdAt", "id", "message", "tag_id", "updatedAt", "user_destiny", "user_sender") SELECT "createdAt", "id", "message", "tag_id", "updatedAt", "user_destiny", "user_sender" FROM "Compliments";
DROP TABLE "Compliments";
ALTER TABLE "new_Compliments" RENAME TO "Compliments";
CREATE TABLE "new_Tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tags" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Tags";
DROP TABLE "Tags";
ALTER TABLE "new_Tags" RENAME TO "Tags";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Users" ("admin", "createdAt", "email", "id", "name", "password", "updatedAt") SELECT "admin", "createdAt", "email", "id", "name", "password", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
