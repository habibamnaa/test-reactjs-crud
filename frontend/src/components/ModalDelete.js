import React from 'react';

const ModalDelete = ({isOpen,onClose,onDeleteProduct}) => {
  return (
    <div class={isOpen?`modal is-active`:"modal"}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">KONFIRMASI</p>
      <button class="delete" onClick={()=> onClose()} aria-label="close"></button>
    </header>
    <section class="modal-card-body">
       <div>Mau hapus produk ini?</div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" onClick={()=>onDeleteProduct()}>Confirm</button>
      <button class="button" onClick={()=> onClose()}>Cancel</button>
    </footer>
  </div>
</div>
  )
}

export default ModalDelete