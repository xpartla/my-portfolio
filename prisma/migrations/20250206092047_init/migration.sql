-- CreateTable
CREATE TABLE "Image" (
                         id SERIAL PRIMARY KEY,
                         title TEXT NOT NULL,
                         description TEXT,
                         filename TEXT NOT NULL,
                         category TEXT NOT NULL,
                         createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Tag" (
                       id SERIAL PRIMARY KEY,
                       name TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageTags" (
                              "A" INTEGER NOT NULL,
                              "B" INTEGER NOT NULL,
                              CONSTRAINT "_ImageTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                              CONSTRAINT "_ImageTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageTags_AB_unique" ON "_ImageTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageTags_B_index" ON "_ImageTags"("B");
