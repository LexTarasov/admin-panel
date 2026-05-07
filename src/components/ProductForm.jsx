import { useState, useEffect } from "react";
import { useAppConfig } from "../context/AppConfigContext";

export default function ProductForm({ product, onSave, onCancel, error }) {
  const { t } = useAppConfig();
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
        {formData.id ? t('form.editProduct') : t('form.createProduct')}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          {t('form.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          {t('form.category')}
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
        >
          <option value="" disabled>{t('form.selectCategory')}</option>
          <option value="shoes">shoes</option>
          <option value="electronics">electronics</option>
          <option value="clothing">clothing</option>
        </select>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          {t('form.price')}
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
        />
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
          {t('form.stock')}
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
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
        <label htmlFor="status" className="ml-2 block text-sm text-gray-900 dark:text-slate-300">
          {t('form.active')}
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {t('form.cancel')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {product ? t('form.saveChanges') : t('form.createBtn')}
        </button>
      </div>
    </form>
  );
}
