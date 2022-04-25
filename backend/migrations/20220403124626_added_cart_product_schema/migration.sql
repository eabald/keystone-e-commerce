-- DropForeignKey
ALTER TABLE "_Cart_products" DROP CONSTRAINT "_Cart_products_B_fkey";

-- CreateTable
CREATE TABLE "CartProduct" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CartProduct_product_idx" ON "CartProduct"("product");

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cart_products" ADD FOREIGN KEY ("B") REFERENCES "CartProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
