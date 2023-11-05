import React, { useState } from "react";
import Button from "../../ui/Button";
import CreatCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { CabinTable } from "./CabinTable";

export default function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreatCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

// export default function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <>
//             <Button onClick={() => setIsOpenModal((show) => !show)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreatCabinForm
//                         onCloseModal={() => setIsOpenModal(false)}
//                     />
//                 </Modal>
//             )}
//         </>
//     );
// }
