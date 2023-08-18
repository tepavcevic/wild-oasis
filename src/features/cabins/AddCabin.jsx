import Button from '../../ui/Button';
import CreateEditCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button type="primary">Add cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateEditCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
