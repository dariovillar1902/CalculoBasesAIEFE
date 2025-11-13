import React from "react";
import type { NavigateFunction } from "react-router-dom";
import type { BaseHormigon } from "../../types/BaseHormigon";
import api from "../../utils/api";
import "./ImportButtons.scss";

interface ImportButtonsProps {
  importing: boolean;
  setImporting: React.Dispatch<React.SetStateAction<boolean>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  navigate: NavigateFunction;
}

const ImportButtons: React.FC<ImportButtonsProps> = ({
  importing,
  setImporting,
  fileInputRef,
  navigate,
}) => {
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      setImporting(true);
      const response = await api.post<BaseHormigon>(
        "baseshormigonio/import",
        formDataUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate("/resultados", { state: { baseId: response.data.id } });
    } catch (error) {
      console.error("Error al importar:", error);
      alert("Error al importar el archivo.");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="buttonGroup">
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleImportFile}
        ref={fileInputRef}
        className="hiddenInput"
      />
      <button
        type="button"
        onClick={() => window.open("/BaseHormigon.xlsx", "_blank")}
        className="downloadButton"
      >
        {importing ? "" : "Descargar plantilla"}
      </button>
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
