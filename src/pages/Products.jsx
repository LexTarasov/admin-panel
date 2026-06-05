import { useState, useEffect } from "react";
import api from "../utils/axios";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import { useData } from '../context/DataContext'
import { useAppConfig } from '../context/AppConfigContext'


export default function Products() {
  // aquí vivirá la lista de productos cuando la traigamos
  const [showModal, setShowModal] = useState({ type: null, product: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const { products, fetchProducts, isLoading } = useData();
  const [error, setError] = useState(null);
  const { t } = useAppConfig();

  const handleDeleteProduct = async (deleteProduct) => {
    try {
      setIsProcessing(true);
      await api.delete(`/api:HQaAbRYz/products/${deleteProduct.id}`);
      fetchProducts();
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsProcessing(false);
      handleCloseModal();
    }
  };

  useEffect(() => {
    fetchProducts(); //
  }, []);

  function handleCloseModal() {
    setShowModal({ type: null, product: null });
    setError(null)
  }

  const handleSaveProduct = async (updatedProduct) => {
    try {
      setIsProcessing(true);
      await api.patch(
        `/api:HQaAbRYz/products/${updatedProduct.id}`,
        updatedProduct,
      );
      fetchProducts();
      handleCloseModal(); // Cerrar modal después de una actualización exitosa
    } catch (error) {
      setError(error)
      console.log("Error al actualizar producto:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateProduct = async (newProduct) => {
    try {
      setIsProcessing(true);
      await api.post("/api:HQaAbRYz/products", newProduct);
      fetchProducts();
      handleCloseModal();
    } catch (e) {
      setError(e.message)
      console.log(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
  <>
    <div className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-black tracking-tight">{t('products.title')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('products.subtitle')}</p>
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
          onClick={() => setShowModal({ type: "create", product: "" })}
        >
          <span className="text-lg">+</span> {t('products.newProduct')}
        </button>
      </div>

      {/* Table Container - Horizontal Scroll enabled for smaller screens */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-slate-50/50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-600">
            <tr>
              <th className="text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colName')}
              </th>
              <th className="text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colCategory')}
              </th>
              <th className="text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colPrice')}
              </th>
              <th className="text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colStock')}
              </th>
              <th className="text-left text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colStatus')}
              </th>
              <th className="text-right text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-4 py-3">
                {t('products.colActions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-20">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-slate-400 font-medium">{t('products.syncing')}</span>
                  </div>
                </td>
              </tr>
            )}

            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-20 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold">{t('products.empty')}</p>
                    <p className="text-xs">{t('products.emptyHint')}</p>
                  </div>
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50/30 dark:hover:bg-slate-700/30 transition-colors group"
              >
                <td className="px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  {product.name}
                </td>
                <td className="px-4 py-2.5 text-xs text-slate-500">
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  ${product.price}
                </td>
                <td className="px-4 py-2.5 text-xs">
                  <span className={`font-medium ${product.stock < 5 ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {product.stock} {t('products.units')}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center text-[11px] font-black px-2.5 py-1 rounded-full border ${
                      product.status
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${product.status ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    {product.status ? t('products.active') : t('products.inactive')}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 font-bold text-[11px] transition-colors"
                      onClick={() => setShowModal({ type: "edit", product: product })}
                    >
                      {t('products.edit')}
                    </button>
                    <button
                      className="text-rose-500 hover:text-rose-700 font-bold text-[11px] transition-colors"
                      onClick={() => setShowModal({ type: "delete", product: product })}
                    >
                      {t('products.delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals para Create/Edit */}
      {(showModal.type === "edit" || showModal.type === "create") && (
        <Modal handleCloseModal={handleCloseModal}>
          <div className="p-2">
             <ProductForm
                product={showModal.product}
                onSave={showModal.type === "edit" ? handleSaveProduct : handleCreateProduct}
                onCancel={handleCloseModal}
                error={error}
              />
          </div>
        </Modal>
      )}

      {/* Modal para Delete */}
      {showModal.type === "delete" && (
        <Modal handleCloseModal={handleCloseModal}>
          <div className="p-4 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('products.deleteTitle')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
              {t('products.deleteMessage')}
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleDeleteProduct(showModal.product)}
                disabled={isProcessing}
                className="w-full py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                {t('products.confirmDelete')}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isProcessing}
                className="w-full py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                {t('products.keepProduct')}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  </>
);
}
