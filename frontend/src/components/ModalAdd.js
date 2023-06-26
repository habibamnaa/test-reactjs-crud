import React from 'react';
import AddProduct from './AddProduct';

const ModalAdd = ({isOpen,onClose,callBackAfterAddProductSuccess}) => {
   
function onSuccess(status){
    if(status && status ==="success"){
        callBackAfterAddProductSuccess()
    }
    onClose()
}
  return (
    <div class={isOpen?`modal is-active`:"modal"}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">FORM DATA</p>
      <button class="delete" onClick={()=> onClose()} aria-label="close"></button>
    </header>
    <section class="modal-card-body">
        <AddProduct onClose={(status)=>onSuccess(status)} />
    </section>
    {/* <footer class="modal-card-foot">
      <button class="button is-success">Save changes</button>
      <button class="button" onClick={()=> onClose()}>Cancel</button>
    </footer> */}
  </div>
</div>
  )
}

export default ModalAdd