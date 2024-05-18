import { ButtonPrimary, ButtonStrong } from '@/components/parts/Button';
import { DetailOrderContex } from '@/contexts/detailOrderContext';
import { addCheckout, editProductInCheckout, getDetailOrder } from '@/fetching/orders';
import { getAllUsers } from '@/fetching/user';
import React, { useContext, useEffect, useState } from 'react'
import { ListOrderContext } from './context';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const modalId = 'modal-add-order'

const openModalAddOrder = () => {
  document.getElementById(modalId).showModal()
}

const closeModalAddOrder = () => {
  document.getElementById(modalId).close()
}

const ModalAddOrder = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    userId: '',
    address: '',
    courier: '',
    method: ''
  })

  const { users } = useContext(ListOrderContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    addCheckout(form)
    .then((r) => {
      console.log(r)
      toast.success("Success Creating a new Checkout");
      setForm({
        userId: '',
        address: '',
        courier: '',
        method: ''
      })
      closeModalAddOrder()
      router.push(`/orders/${r.data.id}`)
    }).catch((e) => {
      console.log(e);
      toast.error(`Error adding checkout: ${e}`)
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleCancel = () => {
    setForm({
      userId: '',
      address: '',
      courier: '',
      method: ''
    })
    closeModalAddOrder()
  }

  const options = [];
  for (let i = 1; i <= 100; i++) {
    options.push(<option key={i} value={`User ${i}`}>User {i}</option>);
  }

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box h-auto w-auto max-w-full ">
          <div className='flex flex-col items-center'>
            <h2 className="font-bold text-lg mb-5">Create New Order</h2>
            <div className='flex justify-center items-center'>
              <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center justify-center gap-2'>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Username</span>
                  </div>
                  <select name="userId" id=""
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => { handleChange(e) }}
                    value={form.username}
                    required>
                    <option value=""> </option>
                    {users.map((u) => (
                      <option key={u.id} value={`${u.id}`}>{u.username}</option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Adress</span>
                  </div>
                  <textarea rows={5}
                    value={form.address}
                    name='address'
                    placeholder="Type here"
                    className="textarea textarea-bordered w-full max-w-xs h-32 max-h-32"
                    onChange={(e) => { handleChange(e) }}
                    required />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Courier</span>
                  </div>
                  <select name="courier"
                    className="select select-bordered w-full max-w-xs"
                    value={form.courier}
                    onChange={(e) => { handleChange(e) }}
                    required>
                    <option value=""> </option>
                    <option value="JNE">JNE</option>
                    <option value="TIKI">TIKI</option>
                    <option value="POS INDONESIA">POS INDONESIA</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Method</span>
                  </div>
                  <select name="method"
                    value={form.method}
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => { handleChange(e) }}
                    required>
                    <option value=""> </option>
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="B2B">B2B</option>
                  </select>
                </label>
                <div className='flex justify-between items-center w-80'>
                  <ButtonPrimary type="submit" className="mt-4">Submit</ButtonPrimary>
                  <ButtonStrong type="button" className="mt-4" onClick={handleCancel}>Cancel</ButtonStrong>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalAddOrder

export {
  openModalAddOrder,
  closeModalAddOrder
}
