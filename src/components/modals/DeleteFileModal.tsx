import { X } from "lucide-react";
import Backdrop from "../ui/Backdrop";
import { useContext } from "react";
import { ModalContext } from "../../context/Modal.context";
import { CodeEditorContext } from "../../context/CodeEditor.context";
import secureLocalStorage from "react-secure-storage";
import { secure_store_keys } from "../../constants/secure-store-keys";
import { TabContext } from "../../context/Tab.context";

export default function DeleteFileModal() {
  const { setOpenFiles } = useContext(TabContext);
  const { setFiles } = useContext(CodeEditorContext);
  const modalContextProps = useContext(ModalContext);

  const closeModal = () => {
    modalContextProps.setDeleteModalIsOpen(false);
    modalContextProps.setFileToDelete("");
  };

  if (!modalContextProps.deleteModalIsOpen) {
    return;
  }

  const onDeleteHandler = () => {
    if (!modalContextProps.fileToDelete) {
      alert("no file was selected for deletion");
    } else {
      setFiles((oldState) => {
        const newState = { ...oldState };

        delete newState[modalContextProps.fileToDelete];

        secureLocalStorage.setItem(
          secure_store_keys.files,
          JSON.stringify(newState)
        );

        return newState;
      });

      setOpenFiles((oldstate) => {
        const newState = [...oldstate];
        const indexOfFileToDelete = newState.findIndex(
          (item) => item.name === modalContextProps.fileToDelete
        );
        newState.splice(indexOfFileToDelete, 1);

        secureLocalStorage.setItem(
          secure_store_keys.tabs,
          JSON.stringify(newState)
        );

        return newState;
      });

      closeModal();
    }
  };

  return (
    <Backdrop onClick={closeModal} className="flex items-center justify-center">
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative p-6 rounded-md bg-white shadow-md sm:max-w-[500px]"
      >
        <h1 className="text-slate-500 dark:text-slate-950 text-lg font-medium">
          Are you sure you want to delete "{modalContextProps.fileToDelete}" ?
        </h1>

        <button
          type="button"
          onClick={onDeleteHandler}
          className="text-white bg-red-500 p-1 px-2 border border-gray-300 rounded-md mt-2 text-sm mr-2 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="text-white bg-slate-950 p-1 px-2 border border-gray-300 rounded-md mt-2 text-sm disabled:opacity-20 disabled:cursor-not-allowed"
        >
          No
        </button>

        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-slate-500 dark:text-slate-950"
        >
          <X size={20} />
        </button>
      </section>
    </Backdrop>
  );
}
