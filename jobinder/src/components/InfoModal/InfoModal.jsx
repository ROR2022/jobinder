import Modal from "react-bootstrap/Modal";
import logoSmall from "../../assets/img/logoSmall-removebg-preview.png";
import PropTypes from 'prop-types'
const InfoModal = ({dataModal,showInfoModal,setShowInfoModal, setConfirmModal}) => {
const {title,description, severity, isConfirm} = dataModal
const handleConfirm = ()=>{
    setConfirmModal(true)
    setShowInfoModal(false)
}
    const handleClose = () => setShowInfoModal(false);
    const classModal = severity === "error" ? "bg-danger bg-opacity-25" : "bg-success bg-opacity-25"
  return (
    <Modal show={showInfoModal} onHide={handleClose} className={classModal}>
      <Modal.Header closeButton>
        <img width={"50px"} src={logoSmall} className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      {isConfirm===true && (
        <Modal.Footer >
        <button className="btn btn-danger" onClick={handleConfirm}>
          Confirmar
        </button>
        <button className="btn btn-secondary" onClick={handleClose}>
          Cancelar
        </button>
      </Modal.Footer>
      )}
      
    </Modal>
  )
}
InfoModal.propTypes = {
  dataModal: PropTypes.object.isRequired,
  showInfoModal: PropTypes.bool.isRequired,
  setShowInfoModal: PropTypes.func.isRequired,
  setConfirmModal: PropTypes.func
}

export default InfoModal