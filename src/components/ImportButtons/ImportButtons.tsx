import React from "react";
import type { NavigateFunction } from "react-router-dom";
import type { BaseHormigon } from "../../types/BaseHormigon";
import api from "../../utils/api";
import "./ImportButtons.scss";

interface ImportButtonsProps {
  importing: boolean;
  // Estado que indica si se está realizando la importación

  setImporting: React.Dispatch<React.SetStateAction<boolean>>;
  // Setter para actualizar el estado de "importing"

  fileInputRef: React.RefObject<HTMLInputElement | null>;
  // Referencia al input file escondido usado para subir el archivo

  navigate: NavigateFunction;
  // Función de navegación para redirigir al usuario después de importar
}

const ImportButtons: React.FC<ImportButtonsProps> = ({
  importing,
  setImporting,
  fileInputRef,
  navigate,
}) => {
  // Dispara el click del input oculto para abrir el selector de archivos
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Maneja el archivo seleccionado por el usuario
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return; // Si no hay archivo, salir sin hacer nada

    const formDataUpload = new FormData();
    // Se usa FormData porque el backend recibe multipart/form-data
    formDataUpload.append("file", file);

    try {
      setImporting(true); // Activa el estado de carga

      // Llamada al endpoint de importación
      const response = await api.post<BaseHormigon>(
        "baseshormigonio/import",
        formDataUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Redirige a la pantalla de resultados pasando el ID importado
      navigate("/resultados", { state: { baseId: response.data.id } });
    } catch (error) {
      console.error("Error al importar:", error);
      alert("Error al importar el archivo.");
    } finally {
      setImporting(false); // Finaliza el estado de carga

      // Limpia el input file para permitir volver a seleccionar el mismo archivo
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="buttonGroup">
      {/* Input oculto que maneja la subida del archivo */}
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleImportFile}
        ref={fileInputRef}
        className="hiddenInput"
      />

      {/* Botón para descargar la plantilla base */}
      <button
        type="button"
        onClick={() => window.open("/BaseHormigon.xlsx", "_blank")}
        className="downloadButton"
      >
        {importing ? "" : "Descargar plantilla"}
      </button>

      {/* Botón para importar archivo; se desactiva durante la carga */}
      <button
        type="button"
        onClick={handleImportClick}
        className="importButton"
        disabled={importing}
      >
        {importing ? "Importando..." : "Importar archivo"}
      </button>
    </div>
  );
};

export default ImportButtons;
