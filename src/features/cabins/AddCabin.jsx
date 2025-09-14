import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
    return ( 
    <Modal>
        <Modal.Open opens='cabin-form'>
            <Button>Add new cabin</Button>
        </Modal.Open>   
        <Modal.Window name='cabin-form'>
            <CreateCabinForm />
        </Modal.Window>
    </Modal>

    // <Modal>
    //     <Model.Open opens='table-form'>
    //         <Button>Add new cabin</Button>
    //     </Model.Open>
    //     <Modal.Window name='table-form'>
    //         <CreateCabinForm />
    //     </Modal.Window>
    // </Modal>
    )

}

// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal(prev => !prev)}>Add new cabin</Button>
//             {isOpenModal &&
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//                 </Modal>}
//         </div>

//     )
// }

export default AddCabin;