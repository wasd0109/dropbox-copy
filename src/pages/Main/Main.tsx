import React, { useState } from "react";
import { auth } from "../../utils/fbInit";
import Navbar from "../../components/Navbar";
import { AiOutlineFileAdd } from "react-icons/ai";
import Modal from "react-overlays/Modal";
import { divide } from "lodash";

function Main() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Main;
