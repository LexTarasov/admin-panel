import ReactDom from "react-dom"

export default function Modal(props){
    const {children, handleCloseModal} = props

    return ReactDom.createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fondo oscuro (Backdrop) que cierra el modal al hacer clic fuera */}
            <button
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm w-full h-full border-none cursor-default focus:outline-none"
                onClick={handleCloseModal}
            />

            {/* Contenedor del Modal */}
            <div className="relative bg-white dark:bg-slate-800 w-full max-w-md p-8 rounded-2xl shadow-2xl z-10 transform transition-all animate-in fade-in zoom-in duration-200">
                {/* Botón "X" de cierre rápido */}
                <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors text-2xl"
                >
                    &times;
                </button>

                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}
