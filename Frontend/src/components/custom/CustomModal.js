import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CustomModal({
  title = "Delete Item!",
  body = "Are you sure to delete this item?",
  submitBtnText = "Yes",
  submitBtnVariant = "primary",
  cancelBtnText = "Cancel",
  cancelBtnVariant = "secondary",
  submitAction = null,
  cancelAction = null,
  setShow,
  show,
}) {
  const handleCancel = () => {
    if (cancelAction) cancelAction();
    setShow(false);
  };
  const handleSubmit = () => {
    if (submitAction) submitAction();
    setShow(false);
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant={cancelBtnVariant} onClick={handleCancel}>
            {cancelBtnText}
          </Button>
          <Button variant={submitBtnVariant} onClick={handleSubmit}>
            {submitBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
