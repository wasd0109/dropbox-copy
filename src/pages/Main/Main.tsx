import React, { useState } from "react";
import { auth } from "../../utils/fbInit";
import Navbar from "../../components/Navbar";
import { AiOutlineFileAdd } from "react-icons/ai";
import Modal from "react-overlays/Modal";
import { divide } from "lodash";

function Main() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <div className="h-screen">
      <Navbar />
      <div className="mt-2 border-2">
        <button
          onClick={() => setShowUploadModal(true)}
          className="border-2 ml-auto border-blue-400 text-2xl flex px-4 py-2 justify-center items-center"
        >
          <AiOutlineFileAdd />
          Upload
        </button>
        <div className="flex justify-evenly">
          <button className="border-2">Name</button>
          <button>Size</button>
          <button>Date</button>
        </div>
      </div>
      <Modal
        className="w-2/3 z-50 fixed top-2/4 left-1/2 border-2 bg-white p-5"
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        renderBackdrop={() => (
          <div
            onClick={() => setShowUploadModal(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black opacity-40"
          ></div>
        )}
      >
        <div>
          <p>Add file to upload</p>
          <input type="file" />
        </div>
      </Modal>
    </div>
  );
}

export default Main;
