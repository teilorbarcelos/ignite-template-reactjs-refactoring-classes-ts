import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { useFoods } from '../../hooks/useFoods'
import { FoodProps } from '../../contexts/FoodsContext'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalAddFood({ isOpen, setIsOpen }: Props) {
  const { handleAddFood } = useFoods()

  async function handleSubmit(data: FoodProps) {
    handleAddFood(data)
    setIsOpen(false)
  }

  return (
    <Modal
      isModalOpen={isOpen}
      setModalOpen={setIsOpen}
    >
      <Form ref={createRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}