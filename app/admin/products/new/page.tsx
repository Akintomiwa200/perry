"use client";
import { useState } from "react";

import { Plus, Upload, X } from "lucide-react";

export default function NewProductPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            color: "var(--deep)",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Add New Product
        </h1>
        <p className="text-sm" style={{ color: "var(--mid)" }}>
          Create a new product listing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div
            className="card"
            style={{ background: "var(--color-surface)", padding: "24px" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--deep)" }}
            >
              Basic Information
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                  placeholder="Enter product description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "var(--mid)" }}
                  >
                    Price (NGN)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg text-sm"
                    style={{
                      background: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border)",
                      color: "var(--deep)",
                    }}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium mb-2 block"
                    style={{ color: "var(--mid)" }}
                  >
                    Compare Price
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg text-sm"
                    style={{
                      background: "var(--color-surface-raised)",
                      border: "1px solid var(--color-border)",
                      color: "var(--deep)",
                    }}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{ background: "var(--color-surface)", padding: "24px" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--deep)" }}
            >
              Inventory
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  SKU
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                  placeholder="SKU-001"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div
            className="card"
            style={{ background: "var(--color-surface)", padding: "24px" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--deep)" }}
            >
              Product Images
            </h2>
            <div
              className="border-2 border-dashed rounded-xl p-6 text-center"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Upload
                size={32}
                className="mx-auto mb-2"
                style={{ color: "var(--mid)" }}
              />
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--deep)" }}
              >
                Drop images here
              </p>
              <p className="text-xs" style={{ color: "var(--mid)" }}>
                or click to browse
              </p>
            </div>
          </div>

          <div
            className="card"
            style={{ background: "var(--color-surface)", padding: "24px" }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--deep)" }}
            >
              Organization
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                >
                  <option value="">Select category</option>
                  <option value="apparel">Apparel</option>
                  <option value="accessories">Accessories</option>
                  <option value="footwear">Footwear</option>
                  <option value="jewelry">Jewelry</option>
                </select>
              </div>
              <div>
                <label
                  className="text-sm font-medium mb-2 block"
                  style={{ color: "var(--mid)" }}
                >
                  Tags
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: "var(--color-surface-raised)",
                    border: "1px solid var(--color-border)",
                    color: "var(--deep)",
                  }}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-lg font-medium"
            style={{ background: "var(--terracotta)", color: "var(--cream)" }}
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
