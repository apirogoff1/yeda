"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  stock: number;
  isNew: boolean;
  isHit: boolean;
  images: { url: string; alt?: string }[];
  category: { name: string; slug: string };
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function fetchProducts(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/products?${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<ProductsResponse>;
}

export default function CatalogPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [inStock, setInStock] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, search, sortBy, sortOrder, inStock],
    queryFn: () =>
      fetchProducts({
        page: String(page),
        limit: "12",
        ...(search && { search }),
        sortBy,
        sortOrder,
        ...(inStock && { inStock: "true" }),
      }),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catalog</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={`${sortBy}_${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("_");
            setSortBy(field);
            setSortOrder(order);
            setPage(1);
          }}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => { setInStock(e.target.checked); setPage(1); }}
            className="w-4 h-4"
          />
          <span>In stock only</span>
        </label>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-16 text-red-500">
          Failed to load products. Please try again.
        </div>
      )}

      {data && data.products.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No products found.
        </div>
      )}

      {data && data.products.length > 0 && (
        <>
          <p className="text-gray-500 mb-4">
            Found {data.pagination.total} products
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square bg-gray-100">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.isHit && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        Hit
                      </span>
                    )}
                    {product.oldPrice && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-medium">Out of stock</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    {product.category.name}
                  </p>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">
                      {Number(product.price).toLocaleString("ru-RU")} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {Number(product.oldPrice).toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {data.pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Prev
              </button>
              {Array.from({ length: data.pagination.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border rounded-lg transition ${
                    page === i + 1
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}