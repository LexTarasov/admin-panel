import { useState, useEffect } from "react";

export default function ProductForm({ product, onSave, onCancel, error }) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    status: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        status: product.status !== undefined ? product.status : true,
      });
    } else {
      // Reset form for new product creation if needed, or handle differently
      setFormData({
        id: null,
        name: "",
        category: "",
        price: "",
        stock: "",
        status: true,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call the onSave prop with the form data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {formData.id ? "Edit Product" : "Create New Product"}
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
         required
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="shoes">shoes</option>
          <option value="electronics">electronics</option>
          <option value="clothing">clothing</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          min="0"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="status"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="status" className="ml-2 block text-sm text-gray-900">
          Active
        </label>
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {product ? "Save Changes" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
