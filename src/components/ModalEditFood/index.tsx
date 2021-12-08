import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { FoodProps } from '../../contexts/FoodsContext'
import { useFoods } from '../../hooks/useFoods'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalEditFood({ isOpen, setIsOpen }: Props) {
  const { handleUpdateFood, editingFood } = useFoods()

  async function handleSubmit(data: FoodProps) {
    const newFood = {
      id: editingFood.id,
      available: editingFood.available,
      description: data.description,
      image: data.image,
      name: data.name,
      price: data.price
    }

    handleUpdateFood(newFood)
    setIsOpen(false)
  }

  return (
    <Modal isModalOpen={isOpen} setModalOpen={setIsOpen}>
      <Form ref={createRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}