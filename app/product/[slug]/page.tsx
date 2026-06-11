"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

async function fetchProduct(slug: string) {
  const res = await fetch(`/api/products/${slug}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default function ProductPage() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => fetchProduct(slug as string),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-100 rounded animate-pulse w-1/4" />
            <div className="h-24 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link href="/catalog" className="text-blue-500 hover:underline">
          Back to catalog
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - Number(product.price) / Number(product.oldPrice)) * 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-500">Home</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-blue-500">Catalog</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category.slug}`} className="hover:text-blue-500">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt || product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                No image
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === i ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isNew && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">New</span>
            )}
            {product.isHit && (
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">Hit</span>
            )}
            {discount && (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">-{discount}%</span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {product.avgRating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.round(product.avgRating) ? "text-yellow-400" : "text-gray-200"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.avgRating} ({product._count.reviews} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-gray-900">
              {Number(product.price).toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">
                {Number(product.oldPrice).toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          )}

          {product.variants.length > 0 && (
            <div className="mb-6">
              <p className="font-medium mb-2">Options:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v: any) => (
                  <button
                    key={v.id}
                    className="border rounded-lg px-4 py-2 text-sm hover:border-blue-500 transition"
                  >
                    {v.name}: {v.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg hover:bg-gray-50 transition"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 text-lg hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
            </span>
          </div>

          <button
            disabled={product.stock === 0}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add to cart
          </button>

          {product.sku && (
            <p className="text-xs text-gray-400 mt-4">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review: any) => (
              <div key={review.id} className="border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-medium text-blue-700">
                    {review.user.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="font-medium">{review.user.name || "User"}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-200"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {review.comment && (
                  <p className="text-gray-600">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}