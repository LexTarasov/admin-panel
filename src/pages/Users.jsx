import { useState, useEffect } from "react";
import api from "../utils/axios";
import Modal from "../components/Modal";
import { useData } from "../context/DataContext";
import { useAppConfig } from "../context/AppConfigContext";

export default function Users() {
  const { users, fetchUsers, isLoading } = useData();
  const { t } = useAppConfig();
  const [showModal, setShowModal] = useState({ type: null, user: null });
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    is_active: true,
  });
  const [isProcessing, setIsProcessing] = useState(false); // Estado para indicar si una operación (eliminar/guardar) está en curso

  useEffect(() => {
    if (showModal.user) {
      setFormData({
        id: showModal.user.id,
        name: showModal.user.name,
        email: showModal.user.email,
        role: showModal.user.role || "User",
        is_active: showModal.user.is_active ?? true,
      });
    } else {
      setFormData({ id: null, role: "User", is_active: true });
    }
  }, [showModal.user]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveUser(formData); // Call the onSave prop with the form data
  };

  const handleDeleteUser = async (deleteUser) => {
    try {
      setIsProcessing(true);
      await api.delete(`/api:HQaAbRYz/user/${deleteUser.id}`);
      fetchUsers(); // Refrescar la lista de usuarios desde el contexto
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsProcessing(false);
      handleCloseModal(); // Cerrar modal después de la operación
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleCloseModal() {
    setShowModal({ type: null, user: null });
  }

  const handleSaveUser = async (updatedUser) => {
    try {
      setIsProcessing(true); // Indicar que la operación de guardado está en curso
      await api.patch(`/api:HQaAbRYz/user/${updatedUser.id}`, updatedUser);
      fetchUsers(); // Refrescar la lista de usuarios desde el contexto
      handleCloseModal();
    } catch (error) {
      console.log("Error al actualizar usuario:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl text-slate-900 dark:text-slate-100 font-bold tracking-tight">
              {t('users.title')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('users.subtitle')}
            </p>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50/50 dark:bg-slate-700/50">
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                    {t('users.colName')}
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                    {t('users.colEmail')}
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                    {t('users.colRole')}
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                    {t('users.colStatus')}
                  </th>
                  <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                    {t('users.colActions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700">
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-slate-400 font-medium">
                          {t('users.loading')}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}

                {!isLoading && users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-slate-400">
                      <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">{t('users.empty')}</p>
                        <p className="text-xs">{t('users.emptyHint')}</p>
                      </div>
                    </td>
                  </tr>
                )}

                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-all duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold uppercase tracking-tight border border-slate-200 dark:border-slate-600">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                          user.is_active
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.is_active ? "bg-emerald-500" : "bg-slate-400"}`}
                        ></span>
                        {user.is_active ? t('users.active') : t('users.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-4">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 transition-colors font-bold text-xs"
                          onClick={() => setShowModal({ type: "edit", user: user })}
                        >
                          {t('users.edit')}
                        </button>
                        <button
                          className="text-rose-500 hover:text-rose-700 transition-colors font-bold text-xs"
                          onClick={() => setShowModal({ type: "delete", user: user })}
                        >
                          {t('users.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Editar Usuario */}
        {showModal.type === "edit" && (
          <Modal handleCloseModal={handleCloseModal}>
            <div className="p-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                {t('users.editTitle')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {t('users.editSubtitle')}
              </p>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    {t('users.userRole')}
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm text-slate-900 dark:text-slate-100"
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    id="user-status"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded-md cursor-pointer"
                  />
                  <label
                    htmlFor="user-status"
                    className="text-sm text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                  >
                    {t('users.activeUser')}
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isProcessing}
                    className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {t('users.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? t('users.saving') : t('users.saveChanges')}
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}

        {/* Modal: Confirmar Eliminación */}
        {showModal.type === "delete" && (
          <Modal handleCloseModal={handleCloseModal}>
            <div className="p-4 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {t('users.deleteTitle')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                {t('users.deleteMessage')}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteUser(showModal.user)}
                  disabled={isProcessing}
                  className="w-full py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-lg shadow-rose-100 transition-all disabled:opacity-50"
                >
                  {t('users.deletePermanently')}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isProcessing}
                  className="w-full py-3 text-sm font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  {t('users.cancel')}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
