import { useState } from 'react'

import { Header } from '../../components/Header'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'
import { useFoods } from '../../hooks/useFoods'
import { Food } from '../../components/Food'

export function Dashboard() {
  const { foods } = useFoods()
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  async function toggleModal() {
    setModalOpen(modalOpen ? false : true)
  }

  async function toggleEditModal() {
    setEditModalOpen(editModalOpen ? false : true)
  }

  return (
    <>
      <Header setModalOpen={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              setEditModalOpen={toggleEditModal}
            />
          ))}
      </FoodsContainer>
    </>
  )
}